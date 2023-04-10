var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var sassMiddleware = require('node-sass-middleware');
var favicon = require('serve-favicon');
var expressLayouts = require('express-ejs-layouts');

var app = express();
app.use(favicon(path.join(__dirname, 'public', '/imgs/favicon.ico')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', './layouts/theme');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(
//   sassMiddleware({
//     src: path.join(__dirname, 'public'),
//     dest: path.join(__dirname, 'public'),
//     indentedSyntax: false,
//     sourceMap: true,
//   }),
// );

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
