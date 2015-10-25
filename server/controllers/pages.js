'use strict';

exports.now = (req, res, next) => {
  res.render('now');
};

exports.expenses = (req, res, next) => {
  res.render('expenses');
};

exports.travel = (req, res, next) => {
  res.render('travel');
};

exports.planner = (req, res, next) => {
  res.render('planner');
};

exports.notes = (req, res, next) => {
  res.render('notes');
};

exports.profile = (req, res, next) => {
  res.render('profile');
};