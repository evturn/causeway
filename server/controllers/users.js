'use strict';
let User = require('../models/user');

exports.user = (req, res, next) => {
  res.render('profile');
};

exports.users = (req, res, next) => {
  let name = req.query.name;
  User.find({'name.first': name}, (err, users) => {
    if (err) {
      console.log(err);
    }
    res.json({users: users});
  });
};

exports.logout = (req, res, next) => {
  req.logout();
  res.redirect('/');
};