'use strict';
let express = require('express');
let handlebars = require('express-handlebars');
let helpers = require('../../shared/hbs-helpers');
let mongoose = require('mongoose');
let session = require('express-session');
let logger = require('morgan');
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
      'shared/templates'
    ],
    layoutsDir: 'views/layouts'
  }),
  static: {
    root: express.static('/'),
    dist: express.static('public/dist'),
    hbs: express.static('shared/templates')
  },
  session: session({
    secret: 'crankshaft',
    saveUninitialized: false,
    resave: false
  }),
  port: process.env.PORT || 3000,
  logger: logger('dev'),
  cookieParser: cookieParser(),
  bodyParser: bodyParser.json(),
  urlencoded: bodyParser.urlencoded({extended: false})
};