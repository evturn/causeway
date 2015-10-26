'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const transactionSchema = new mongoose.Schema({
  total       : {type: String, sparse: true},
  description : {type: String, sparse: true},
  payee       : {type: Schema.Types.ObjectId, ref: 'User'},
  debtors     : [{
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    debt: {type: Schema.Types.ObjectId, ref: 'User'}
  }],
  timestamp   : {type: Date, default: Date.now()},
});

module.exports = mongoose.model('Transaction', transactionSchema);