'use strict';
const express = require('express');
const handlebars = require('express-handlebars');
const helpers = require('../../shared/hbs-helpers');
const mongoose = require('mongoose');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const client = require('redis').createClient();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

module.exports = {
  mongo: () => {
    mongoose.connect('mongodb://localhost/causeway');
    mongoose.connection.on('error',
      console.error.bind(console,
        'connection error:'));
    mongoose.connection.once('open',
      () => {
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