var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var expressLayouts = require('express-ejs-layouts');

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

app.get('/', function (req, res) {
  res.render('pages/home');
});

app.get('/:page', function (req, res) {
  res.render('pages/' + req.params.page);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});
