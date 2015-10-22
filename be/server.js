
// modules =================================================
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    flash = require('connect-flash'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    passport = require('passport');

// configuration ===========================================

// config files
var db = require('./config/db');

//vars
var port = process.env.PORT || 8080;

//connect to db
mongoose.connect(db.url);

// connect to our mongoDB database
// (uncomment after you enter in your own credentials in config/db.js)
// mongoose.connect(db.url);

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/ui'));
app.set('views', __dirname + '/ui/views');

// log requests
app.use(morgan('dev'));

// use cookies
app.use(cookieParser());

// passport config
require('./config/passport')(passport);
app.use(session({ secret: 'whatthatcantbeitsoverninethousand'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// set up ejs for templating
app.set('view engine', 'ejs');

// routes ==================================================
require('./app/routes')(app, passport); // configure our routes

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// shoutout to the user
console.log('Server started on port ' + port);

// expose app
exports = module.exports = app;