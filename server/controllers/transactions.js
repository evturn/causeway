'use strict';
let Transaction = require('../models/transaction');

exports.create = (req, res, next) => {
  let transaction = req.body;
  transaction.payee = req.user.name.first;
  transaction.timestamp = Date.now();

  let record = new Transaction(transaction);
  record.save((err, record) => {
    if (err) {
      console.log(err);
      return err;
    }
    else {
      res.json(record);
    }
  });
};