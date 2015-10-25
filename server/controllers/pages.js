'use strict';
let data = require('../lib/assembler');

exports.now = (req, res, next) => {
  data.activePage = 'now';
  data.user = req.user;
  req.session.key = req.user._id;
  res.render('now', data);
};

exports.expenses = (req, res, next) => {
  data.activePage = 'expenses';
  data.user = req.user;
  res.render('expenses', data);
};

exports.travel = (req, res, next) => {
  data.activePage = 'travel';
  data.user = req.user;
  res.render('travel', data);
};

exports.planner = (req, res, next) => {
  data.activePage = 'planner';
  data.user = req.user;
  res.render('planner', data);
};

exports.notes = (req, res, next) => {
  data.activePage = 'notes';
  data.user = req.user;
  res.render('notes', data);
};

exports.profile = (req, res, next) => {
  data.activePage = 'profile';
  data.user = req.user;
  res.render('profile', data);
};