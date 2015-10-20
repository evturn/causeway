'use strict';
let User = require('../models/user').User;

exports.user = function(res, req, next) {

};

exports.users = function(res, req, next) {
  User.find((err, users) => {
    if (err) {
      console.log(err);
    }
    res.json({users: users});
  });
};