// Import Express & View Engine
var express = require('express');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var session = require('express-session');

// Import Misc Server Utils
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');

// Import Passport
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Import MongoDB
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/loginapp');
var db = mongoose.connection;


// Set API Routes
var routes = require('./routes/index');
var users = require('./routes/users');

// Init App
var app = express();

// Init View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', erphbs({
  defaultLayout: 'layout'
}));
app.set('view engine', 'handlebars');

// Init body-parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Express Validator
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Flash Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Intialize Routes
app.use('/', routes);
app.use('/users', users);

// Set port and start Express
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function () {
  console.log('Server started on port ' + app.get('port'));
});