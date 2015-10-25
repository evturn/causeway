'use strict';
let data = require('../lib/assembler').site;

exports.change = (req, res, next) => {
  let name = req.params.name;
  data.group = 'name';
  data.activePage = 'profile';
  data.user = req.user;
  res.redirect('/profile');
};