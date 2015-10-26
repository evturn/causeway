'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let deepPopulate = require('mongoose-deep-populate')(mongoose);

const groupSchema = new mongoose.Schema({
  name          : {type: String},
  members       : [{
    type: Schema.Types.ObjectId, ref: 'User'
  }],
  transactions  : [{
    type: Schema.Types.ObjectId, ref: 'Transaction'
  }]
});

groupSchema.plugin(deepPopulate);
module.exports = mongoose.model('Group', groupSchema);