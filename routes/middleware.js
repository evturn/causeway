'use strict';

let menu = require('./lib/assembler');

exports.index = function(req, res, next) {
  res.render('index', {menu: menu, activePage: 'Now'});
};