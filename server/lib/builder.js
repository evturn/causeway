'use strict';
let assemblers = require('./assemblers');
let Group = require('../models/group');

module.exports = (app) => {
  app.locals = assemblers;
  return app;
};