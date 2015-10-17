'use strict';
let data = require('./resources/users.json');
let mongoose = require('mongoose');
let User = require('../routes/lib/user');

module.exports = () => {
  let user = new User(data);
  user.save((err, user) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log('===============');
      console.log(user);
      console.log('===============');
      console.log('DATABASE SEEDED');
    }
  });
};