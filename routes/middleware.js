'use strict';
let site = require('./lib/assembler');
let oauth = require('./lib/google-oauth');
let passport = require('passport');

exports.index = function(req, res, next) {

};

exports.now = oauth.login, function(req, res, next) {
  console.log(req);
  res.render('now', {site, activePage: 'now'});
};

exports.expenses = function(req, res, next) {
  res.render('expenses', {site, activePage: 'expenses'});
};

exports.travel = function(req, res, next) {
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

exports.google = oauth.callback, function(req, res, next) {
  console.log(req);
  res.redirect('/expenses');
};
