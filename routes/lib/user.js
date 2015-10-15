'use strict';
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let userSchema = new mongoose.Schema({
  gid        : {type: String},
  avatar     : {type: String},
  coverPhoto : {type: String},
  gender     : {type: String},
  fullname   : {type: String},
  location   : {type: String},
  token      : {type: String},
  name: {
    first    : {type: String},
    last     : {type: String}
  },
  geo: {
    lat      : {type: String},
    long     : {type: String},
    lastSeen : {type: String}
  }
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);