'use strict';
let Transaction = require('../models/transaction');
let Group = require('../models/group');

exports.create = (req, res, next) => {
  let transaction = req.body;
  let groupId = req.body.groupId;
  transaction.payee = req.user._id;
  transaction.group = groupId;

  Group.findById(groupId, (err, group) => {
    if (err) {return err;}
    let record = new Transaction(transaction);
    record.save((err, record) => {
      if (err) {return err;}
      group.transactions.push(record._id);
      group.save((err, group) => {
        if (err) {return err;}
        record.deepPopulate(['payee.name', 'debtors.user'], (err, record) => {
          if (err) {return err;}
          console.log(record);
          res.json(record);
        });
      });
    });
  });
};