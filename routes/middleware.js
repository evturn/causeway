'use strict';

let site = require('./lib/assembler');

exports.index = function(req, res, next) {
  res.render('index', {site, activePage: 'Now'});
};