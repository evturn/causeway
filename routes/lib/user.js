'use strict';
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

const transactionSchema = new mongoose.Schema({
  total       : {type: String, sparse: true},
  description : {type: String, sparse: true},
  payee       : {type: String, sparse: true},
  debtors: [
    {
      user: {type: String, sparse: true},
      debt: {type: String, sparse: true}
    }
  ],
  timestamp   : {type: Date, default: Date.now()},
});

const userSchema = new mongoose.Schema({
  gid        : {type: String, sparse: true},
  avatar     : {type: String, sparse: true},
  coverPhoto : {type: String, sparse: true},
  gender     : {type: String, sparse: true},
  fullname   : {type: String, sparse: true},
  location   : {type: String, sparse: true},
  token      : {type: String, sparse: true},
  name: {
    first    : {type: String, sparse: true},
    last     : {type: String, sparse: true}
  },
  geo: {
    lat      : {type: String, sparse: true},
    long     : {type: String, sparse: true},
    lastSeen : {type: String, sparse: true},
    vicinity : {type: String, sparse: true}
  },
  climate: {
    vicinity    : {type: String, sparse: true},
    temp        : {type: String, sparse: true},
    humidity    : {type: String, sparse: true},
    high        : {type: String, sparse: true},
    low         : {type: String, sparse: true},
    description : {type: String, sparse: true},
    sunrise     : {type: String, sparse: true},
    sunset      : {type: String, sparse: true},
    country     : {type: String, sparse: true},
    wind        : {type: String, sparse: true}
  },
  transactions  : [transactionSchema]
});

userSchema.plugin(passportLocalMongoose);

module.exports.User = mongoose.model('User', userSchema);
module.exports.Transaction = mongoose.model('Transaction', transactionSchema);