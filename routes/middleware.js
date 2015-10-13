'use strict';

let site = require('./lib/assembler');
let googleApi = require('./lib/google-api');

exports.index = function(req, res, next) {
  var url = googleApi.generateAuthUrl();
  res.redirect(url);
};

exports.now = function(req, res, next) {
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

exports.google = function(req, res, next) {
  let code = req.query.code;
  let oauth2Client = googleApi.getOAuth2Client();
  let user;
  oauth2Client.getToken(code, function(err, tokens) {
    oauth2Client.setCredentials(tokens);
    user = googleApi.callback();
    res.redirect('/now');
  });
};
