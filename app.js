var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var expressLayouts = require('express-ejs-layouts');
var axios = require('axios');
var cors = require('cors');

const PORT = process.env.PORT || 3000;
var app = express();

app.use(favicon(path.join(__dirname, 'public', '/images/favicon.ico')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', './layouts/theme');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// CORS configuration for proxy route only
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const allowedOrigins = ['https://wisekingson.com', 'https://wisekingson-straps.com'];
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 200,
  preflightContinue: false,
  maxAge: 86400, // Cache preflight for 24 hours
};

// Handle OPTIONS preflight request for CORS
app.options('/wisekingson', cors(corsOptions), (req, res) => {
  console.log('=== PREFLIGHT OPTIONS REQUEST ===');
  console.log('Origin:', req.headers.origin);
  console.log('Method:', req.method);
  console.log('Request Headers:', req.headers);

  // Set CORS headers explicitly for preflight
  res.header('Access-Control-Allow-Origin', req.headers.origin || 'https://wisekingson-straps.com');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Max-Age', '86400');

  console.log('Response Headers Set:', res.getHeaders());
  console.log('=== PREFLIGHT RESPONSE SENT ===');

  res.status(200).end();
});

// Proxy route for Google Apps Script API
app.post('/wisekingson', cors(corsOptions), async function (req, res) {
  // Log CORS headers for debugging
  console.log('=== PROXY REQUEST START ===');
  console.log('CORS Headers:', {
    origin: req.headers.origin,
    method: req.method,
    'user-agent': req.headers['user-agent'],
  });
  console.log('Request Body:', JSON.stringify(req.body, null, 2));
  console.log('Request Headers:', req.headers);

  try {
    const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbzvS8AChPke-j19PtP4IElR3cyk7SXd4cpYFol-i7DEwoTff0f9F0QXDvk8WkGBnDVx/exec';

    console.log('Making request to Google Apps Script:', googleScriptUrl);
    console.log('Request payload:', JSON.stringify(req.body, null, 2));

    // Make request to Google Apps Script
    const response = await axios.post(googleScriptUrl, req.body, {
      timeout: 10000, // 10 second timeout
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    console.log('=== GOOGLE APPS SCRIPT RESPONSE ===');
    console.log('Response Status:', response.status);
    console.log('Response Headers:', response.headers);
    console.log('Response Data:', JSON.stringify(response.data, null, 2));
    console.log('Response Size:', JSON.stringify(response.data).length, 'characters');

    // Set CORS headers explicitly
    res.header('Access-Control-Allow-Origin', req.headers.origin || 'https://wisekingson-straps.com');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

    // Forward the response from Google Apps Script
    console.log('=== SENDING RESPONSE TO CLIENT ===');
    console.log('Final Response Status:', response.status);
    console.log('Final Response Headers:', res.getHeaders());

    res.status(response.status).json(response.data);

    console.log('=== PROXY REQUEST COMPLETED SUCCESSFULLY ===');
  } catch (error) {
    console.log('=== PROXY ERROR OCCURRED ===');
    console.error('Error Type:', error.constructor.name);
    console.error('Error Message:', error.message);
    console.error('Error Stack:', error.stack);

    if (error.code) {
      console.error('Error Code:', error.code);
    }

    if (error.response) {
      console.error('=== GOOGLE APPS SCRIPT ERROR RESPONSE ===');
      console.error('Error Status:', error.response.status);
      console.error('Error Headers:', error.response.headers);
      console.error('Error Data:', JSON.stringify(error.response.data, null, 2));

      // Forward error response from Google Apps Script
      return res.status(error.response.status).json({
        error: 'Proxy Error',
        message: error.response.data || 'Error from Google Apps Script',
        status: error.response.status,
        timestamp: new Date().toISOString(),
        requestId: Date.now(),
      });
    }

    if (error.code === 'ECONNABORTED') {
      console.error('=== TIMEOUT ERROR ===');
      console.error('Request timed out after 10 seconds');
      return res.status(504).json({
        error: 'Gateway Timeout',
        message: 'Request to Google Apps Script timed out',
        timestamp: new Date().toISOString(),
        requestId: Date.now(),
      });
    }

    if (error.code === 'ENOTFOUND') {
      console.error('=== DNS ERROR ===');
      console.error('Could not resolve hostname');
      return res.status(502).json({
        error: 'Bad Gateway',
        message: 'Could not connect to Google Apps Script',
        timestamp: new Date().toISOString(),
        requestId: Date.now(),
      });
    }

    // Generic error response
    console.error('=== UNKNOWN ERROR ===');
    console.error('Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));

    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to proxy request to Google Apps Script',
      timestamp: new Date().toISOString(),
      requestId: Date.now(),
    });
  }
});

app.get('/', function (req, res) {
  res.render('pages/home');
});

app.get('/:page', function (req, res) {
  res.render('pages/' + req.params.page);
});

app.listen(PORT, function () {
  console.log('Example app listening on port 3000!\n');
});

module.exports = app;
