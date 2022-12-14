var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var inventoryRouter = require('./routes/inventoryrouter.js');
var indexRouter = require('./routes/indexrouter');

require('./models/artpiece');
require('./models/artpieceinstance');
require('./models/category');
require('./models/painter');

var app = express();
var mongoose = require('mongoose');

require('dotenv').config();

// Nodemon neets mongoose.connect in APP.JS to work! 
mongoose.connect(process.env.MONGODB_URI);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/inventory', inventoryRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
