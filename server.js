var express=require('express');
var app=express();
var morgan = require('morgan');
var mongoose=require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser =require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var methodOverride=require('method-override');
var hash = require('bcrypt-nodejs');
var path = require('path');
var passport = require('passport');
var localStrategy = require('passport-local' ).Strategy;
var flash    = require('connect-flash');
var db=require('./config/db');
var db = mongoose.connect(db.url, function(err) {
if (err) {
console.log(err)
}
else{
  console.log('connected to database');
}});
var debug = require('debug')('passport-mongo');
var User=require('./app/models/User');
require('./app/models/post');
require('./app/models/comment');
require('./app/models/friend');
require('./config/passport')(passport);



//CORS middleware
//var allowCrossDomain = function(req, res, next) {
//    // Website you wish to allow to connect
//    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
//    // Request methods you wish to allow
//    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//
//    // Request headers you wish to allow
//    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//
//    // Set to true if you need the website to include cookies in the requests sent
//    // to the API (e.g. in case you use sessions)
//    res.setHeader('Access-Control-Allow-Credentials', true);
//
//    // Pass to next layer of middleware
//
//    next();
//}



//require('./app/routes');
var routes=require('./app/routes');
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//app.use(allowCrossDomain);

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    
      // ttl: 1 * 24 * 60 * 60 // = 1 days. 
    })
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(express.static(path.join(__dirname, 'public')));
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', routes);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './public', 'index.html'));
});



var port = process.env.PORT || 8080;

app.use(function(req, res, next) {
   var err = new Error('Not Found');
   err.status = 404;
  next(err);
});


app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }));
});



// app.use(flash()); // use connect-flash for flash messages stored in session 

// app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
 
// app.use(methodOverride('X-HTTP-Method-Override')); //to override with the X-HTTP-Method-Override header in the request





app.listen(port); 
console.log('App is running on port ' + port);
exports = module.exports = app;                         




