'use strict';
let User = require('../models/user').User;
let data = require('../lib/assembler');

exports.user = (res, req, next) => {
  console.log(req.body.user)
  res.render('profile', data);
};

exports.users = (res, req, next) => {
  User.find((err, users) => {
    if (err) {
      console.log(err);
    }
    res.json({users: users});
  });
};