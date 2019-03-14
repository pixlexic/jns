var express = require('express');
var socket_io = require("socket.io");
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



require('dotenv').config()

// init enviromental variables
//var dB = require('./repositories/dbMySQLRepo');
//dB.init();
//dB.connectTest();
//dB.getOrders();





var socketApi = require('./sockets/socketApi');
var io = socketApi.io;


var hbsConfig = require('./config/HBSconfig');
var passportSocketIo = require('passport.socketio');

var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
require('./config/passport')(passport); // pass passport for configuration


/* routes */

var mapi = require('./routes/api');

var admin = require('./routes/admin');
var index = require('./routes/index');
var users = require('./routes/users');

var webgl = require('./routes/webgl');
var webapps = require('./routes/webapps');
var websolutions = require('./routes/websolutions');

var hbs = require('hbs');
var sharedsession = require("express-socket.io-session");

var session = require("express-session")({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
});

var app = express();




//app.use(require('body-parser').urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session);
app.use(passport.initialize());
app.use(passport.session());


io.use(sharedsession(session, {
    autoSave: true
}));

app.use(express.static(__dirname + '/node_modules'));




// set our handlebars helpers
hbsConfig.init(hbs);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


//hbs.registerLayouts(__dirname + '/views/layouts' );
hbs.registerPartials(__dirname + '/views/partials');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', mapi);

app.use('/admin', admin);
app.use('/', index);
app.use('/users', users);
app.use('/webgl', webgl);
app.use('/webapps', webapps);
app.use('/websolutions', websolutions);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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



//socketApi.init();



module.exports = app;
