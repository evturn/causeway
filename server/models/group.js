'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const groupSchema = new mongoose.Schema({
  name          : {type: String},
  userCount     : {type: Number},
  members       : [{
    type: Schema.Types.ObjectId, ref: 'User'
  }],
  transactions  : [{
    type: Schema.Types.ObjectId, ref: 'Transaction'
  }]
});

module.exports = mongoose.model('Group', groupSchema);