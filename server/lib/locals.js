'use strict';
let url = require('url');
let async = require('async');
let _ = require('underscore');
let User = require('../models/user');
let Group = require('../models/group');
let Transaction = require('../models/transaction');
let app = require('../../server');

module.exports.activePage = (req, res, next) => {
  let urlStr = url.parse(req.originalUrl);
  let pathname = urlStr.pathname;
  let activePage = pathname[0] == '/' ? pathname.substr(1) : pathname;
  res.locals.activePage = activePage;
  next();
};

module.exports.user = (req, res, next) => {
  res.locals.user = req.user;
  next();
};

module.exports.groups = (req, res, next) => {
  let id = req.user._id;
  let locals = [];
  User
    .findById(id)
    .deepPopulate('groups')
    .exec((err, user) => {
      res.locals.groups = user.groups
      next();
    });
};

module.exports.setGroup = (req, res, next) => {
  let id = req.params.id;
  Group
    .findById(id)
    .deepPopulate('members')
    .exec((err, group) => {
      if (err) {return err;}
      res.locals.group = group;
      req.user.set({group: group._id});
      req.user.save();
      next();
    });
};

module.exports.group = (req, res, next) => {
  let id = req.user.group
  Group
    .findById(id)
    .deepPopulate('members')
    .exec((err, group) => {
      if (err) {return err;}
      res.locals.group = group;
      next();
    });
};

exports.transactions = (req, res, next) => {
  let groupId = req.user.group;
  Group
    .findById(groupId)
    .deepPopulate(['transactions', 'transactions.payee.name', 'transactions.debtors.user'])
    .exec((err, group) => {
      if (err) {return err;}
      res.locals.transactions = group.transactions;
      next();
    });
};