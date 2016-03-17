/// <reference path="../typings/tsd.d.ts" />

var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var routes = require('./routes/index');
var articles = require('./routes/articles');
var users = require('./routes/users');

var app = express();

// attempt connection to db
mongoose.connect('mongodb://root:login@ds056698.mlab.com:56698/lucydb');

// verify connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Conection Error: '));
db.once('open', function(callback) {
    console.log("DB Connection successful");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set environment for debugging
app.set('env', 'development');

// setting up our enviroment
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboardCat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// setup static routing
app.use('/scripts', express.static(path.join(path.dirname(__dirname), 'lib')));
app.use('/scripts', express.static(path.join(path.dirname(__dirname), 'public')));

// setup page routing
app.use('/', routes);
app.use('/articles', articles);
app.use('/users', users);

// passport config
var userModel = require('./models/user');
passport.use(new LocalStrategy(userModel.authenticate()));
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
