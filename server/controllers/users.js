'use strict';
let User = require('../models/user').User;

exports.user = (res, req, next) => {
  res.render('profile');
};

exports.users = (res, req, next) => {
  User.find((err, users) => {
    if (err) {
      console.log(err);
    }
    res.json({users: users});
  });
};