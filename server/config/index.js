'use strict';
let express = require('express');
let handlebars = require('express-handlebars');
let helpers = require('../../shared/hbs-helpers');
let mongoose = require('mongoose');
let session = require('express-session');
let RedisStore = require('connect-redis')(session);
let client = require('redis').createClient();
let morgan = require('morgan');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');

module.exports = {
  mongo: () => {
    mongoose.connect('mongodb://localhost/causeway');
    mongoose.connection.on('error',
      console.error.bind(console,
        'connection error:'));
    mongoose.connection.once('open',
      function callback() {
        console.log('DB connected');
    });
  }(),
  hbs: handlebars.create({
    defaultLayout: 'layout',
    extname: '.hbs',
    helpers: helpers,
    partialsDir: [
      'views/partials',
      'views/partials/modules',
      'views/partials/templates'
    ],
    layoutsDir: 'views/layouts'
  }),
  static: {
    root: express.static('/'),
    dist: express.static('client/dist'),
    hbs: express.static('views/partials/templates')
  },
  session: session({
    store: new RedisStore({
      host: 'localhost',
      port: 6379,
      client: client,
      ttl: 260
    }),
    secret: 'crankshaft',
    saveUninitialized: false,
    resave: false
  }),
  port: process.env.PORT || 3000,
  logger: morgan('dev'),
  cookieParser: cookieParser(),
  bodyParser: bodyParser.json(),
  urlencoded: bodyParser.urlencoded({extended: false}),
  router: (app) => {
    require('../routes')(app);
  },
  builder: (app) => {
    require('../lib/builder')(app);
  },
  isListening: () => {
    console.log('Express listening on 3000');
  }
};