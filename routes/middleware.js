'use strict';
let site = require('./lib/assembler');
let googleapi = require('./lib/google-api');
let weatherapi = require('./lib/weather');

exports.now = function(req, res, next) {
  res.render('now', {site, activePage: 'now', user: req.user});
};

exports.expenses = function(req, res, next) {
  res.render('expenses', {site, activePage: 'expenses', user: req.user});
};

exports.travel = function(req, res, next) {
  res.render('travel', {site, activePage: 'travel', user: req.user});
};

exports.planner = function(req, res, next) {
  res.render('planner', {site, activePage: 'planner', user: req.user});
};

exports.notes = function(req, res, next) {
  res.render('notes', {site, activePage: 'notes', user: req.user});
};

exports.profile = function(req, res, next) {
  res.render('profile', {site, activePage: 'profile', user: req.user});
};

exports.google = function(req, res, next) {
  res.redirect('/now');
};

exports.geoposition = function(req, res, next) {
  let user = req.user;
  let latitude = req.body['coords[latitude]'];
  let longitude = req.body['coords[longitude]'];
  let timestamp = req.body.timestamp;

  user.geo.lat = latitude;
  user.geo.long = longitude;
  user.geo.lastSeen = timestamp;
  let p1 = new Promise(function(resolve, reject) {
    let weather = weatherapi.byCoords(latitude, longitude, user, res);
    resolve(weather);
  });
};