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
  origin: ['https://wisekingson.com', 'https://wisekingson-straps.com'],
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Proxy route for Google Apps Script API
app.post('/wisekingson', cors(corsOptions), async function (req, res) {
  try {
    // Google Apps Script URL - replace with your actual script URL
    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbx6COqY-TxvyunVFMsKuQpIxtqCjpOgasTijl5NIYGrSlyJQIVd7jL852dydRQRGkdl/exec';

    // Forward query parameters from the request
    const queryParams = new URLSearchParams(req.query).toString();
    const fullUrl = queryParams ? `${googleScriptUrl}?${queryParams}` : googleScriptUrl;

    // Make request to Google Apps Script
    const response = await axios.post(fullUrl, req.body, {
      timeout: 10000, // 10 second timeout
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    // Forward the response from Google Apps Script
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Proxy error:', error.message);

    if (error.code === 'ECONNABORTED') {
      return res.status(504).json({
        error: 'Gateway Timeout',
        message: 'Request to Google Apps Script timed out',
      });
    }

    if (error.response) {
      // Forward error response from Google Apps Script
      return res.status(error.response.status).json({
        error: 'Proxy Error',
        message: error.response.data || 'Error from Google Apps Script',
        status: error.response.status,
      });
    }

    // Generic error response
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to proxy request to Google Apps Script',
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
