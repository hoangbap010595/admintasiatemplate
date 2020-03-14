var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
// Node customs
var appConfig = require('./config');
var authMiddleware = require('./middlewares/auth.middleware')

// Define routes
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth.route')

// Define routes APIs
var testApiRouter = require('./areas/api/routes/test.route');

// Init App from Express
var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('trust proxy', 1) // trust first proxy

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(appConfig.APP_SECRET));
app.use(session({ secret: appConfig.APP_SECRET, name: appConfig.APP_KEY_SESSION }));
app.use(express.static(path.join(__dirname, appConfig.APP_FOLDER_PUBLIC)));

// Authentication
app.all('/api/*', authMiddleware.ApiAuthJWT);
app.all('/admin/*', authMiddleware.AppAuth);

app.use('/', indexRouter);
app.use('/auth', authRouter);

//Use Route API
app.use('/api/test', testApiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
