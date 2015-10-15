'use strict';

let express = require('express');
let connect = require('connect');
let mongoose = require('mongoose');
let passport = require('passport');
let bodyParser = require('body-parser');
let urlencoded = bodyParser.urlencoded({extended: false});
let User = require('./routes/lib/user');
let session = require('express-session');
let cookieParser = require('cookie-parser');
let config = require('./routes/lib/base');
let routes = require('./routes/routes');
let logger = require('morgan')('dev');
let app = express();

config.database(mongoose);
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'hbs');
app.set('views', 'views');
app.engine('hbs', config.hbs.engine);
app.use('/', express.static(__dirname + '/public/dist'));
app.use(urlencoded);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(logger);
app.use(session({
  secret: 'crankshaft',
  saveUninitialized: false,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
app.use('/', routes.app);
app.use('/auth', routes.auth);

let port = app.get('port');
app.listen(port, function() {
  console.log('Express listening on 3000');
});