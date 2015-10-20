'use strict';

exports.create = (req, res, next) => {
  let transaction = req.body;
  transaction.payee = req.user.name.first;
  transaction.timestamp = Date.now();
  res.json(transaction);
};