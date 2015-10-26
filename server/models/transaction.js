'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let deepPopulate = require('mongoose-deep-populate')(mongoose);

const transactionSchema = new mongoose.Schema({
  total       : {type: String, sparse: true},
  description : {type: String, sparse: true},
  payee       : {type: Schema.Types.ObjectId, ref: 'User'},
  debtors     : [{
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    debt: {type: Number, sparse: true}
  }],
  timestamp   : {type: Date, default: Date.now()},
});

transactionSchema.plugin(deepPopulate);
module.exports = mongoose.model('Transaction', transactionSchema);