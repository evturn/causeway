'use strict';
let site = require('./lib/assembler');

exports.now = function(req, res, next) {
  console.log(req.user);
  res.render('now', {site, activePage: 'now', user: req.user});
};

exports.expenses = function(req, res, next) {
  res.render('expenses', {site, activePage: 'expenses'});
};

exports.travel = function(req, res, next) {
  console.log(req.user);
  res.render('travel', {site, activePage: 'travel'});
};

exports.planner = function(req, res, next) {
  res.render('planner', {site, activePage: 'planner'});
};

exports.notes = function(req, res, next) {
  res.render('notes', {site, activePage: 'notes'});
};

exports.profile = function(req, res, next) {
  res.render('profile', {site, activePage: 'profile'});
};

exports.google = function(req, res, next) {
  res.redirect('/now');
};