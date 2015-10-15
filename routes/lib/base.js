'use strict';
let express = require('express');
let handlebars = require('express-handlebars');
let session = require('express-session');
let logger = require('morgan');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');

module.exports = {
  mongo: function(mongoose) {
    mongoose.connect('mongodb://localhost/causeway');
    mongoose.connection.on('error',
      console.error.bind(console,
        'connection error:'));
    mongoose.connection.once('open',
      function callback() {
        console.log('DB connected');
    });
  },
  hbs: handlebars.create({
    defaultLayout: 'layout',
    extname: '.hbs',
    helpers: new require('./hbs-helpers')(),
    partialsDir: 'views/partials',
    layoutsDir: 'views/layouts'
  }),
  static: {
    dist: express.static('public/dist')
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