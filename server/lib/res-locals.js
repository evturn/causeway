'use strict';
let url = require('url');
let async = require('async');
let _ = require('underscore');
let User = require('../models/user');
let Group = require('../models/group');
let app = require('../../server');

module.exports.activePage = (req, res, next) => {
  let urlStr = url.parse(req.originalUrl);
  let pathname = urlStr.pathname;
  let activePage = pathname[0] == '/' ? pathname.substr(1) : pathname;
  res.locals.activePage = activePage;
  next();
};

module.exports.groups = (req, res, next) => {
  User
    .find({_id: req.user._id})
    .populate('groups')
    .exec((err, user) => {
      if (err) {
        console.log(err);
      }
      else {
        res.locals.user = user[0];
        next();
      }
    });
};

module.exports.group = (req, res, next) => {
  let user = req.user;

  Group
    .find({_id: req.params.id})
    .populate('members, transactions')
    .exec((err, group) => {
      if (err) {
        console.log(err);
      }
      else {
        user.set({group: group});
        user.save((err, user) => {
          if (err) {
            console.log(err);
            return next(err);
          }
          else {
            console.log(user);
            next();
          }
        })
      }
    });
};