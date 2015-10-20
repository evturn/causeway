'use strict';
let data = require('../lib/assembler');

exports.now = function(req, res, next) {
  data.activePage = 'now';
  data.user = req.user;
  res.render('now', data);
};

exports.expenses = function(req, res, next) {
  data.activePage = 'expenses';
  data.user = req.user;
  res.render('expenses', data);
};

exports.travel = function(req, res, next) {
  data.activePage = 'travel';
  data.user = req.user;
  res.render('travel', data);
};

exports.planner = function(req, res, next) {
  data.activePage = 'planner';
  data.user = req.user;
  res.render('planner', data);
};

exports.notes = function(req, res, next) {
  data.activePage = 'notes';
  data.user = req.user;
  res.render('notes', data);
};

exports.profile = function(req, res, next) {
  data.activePage = 'profile';
  data.user = req.user;
  res.render('profile', data);
};