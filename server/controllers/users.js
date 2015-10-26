'use strict';
let User = require('../models/user');

exports.user = (req, res, next) => {
  res.render('profile');
};

exports.users = (req, res, next) => {
  let name = req.query.name;
  let group = req.user.group;
  User.find({'name.first': name}, (err, users) => {
    if (err) {
      console.log(err);
    }
    res.json({users: users, group: group});
  });
};

exports.logout = (req, res, next) => {
  req.logout();
  res.redirect('/');
};