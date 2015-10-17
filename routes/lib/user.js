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
    lastSeen : {type: String},
    vicinity : {type: String}
  },
  climate: {
    vicinity    : {type: String},
    temp        : {type: String},
    humidity    : {type: String},
    high        : {type: String},
    low         : {type: String},
    description : {type: String},
    sunrise     : {type: String},
    sunset      : {type: String},
    country     : {type: String},
    wind        : {type: String}
  }
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);