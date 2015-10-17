'use strict';
let site = require('./lib/assembler');
let googleapi = require('./lib/google-api');
let weatherapi = require('./lib/weather');
let User = require('./lib/user');
let data = {
  nav: site.nav,
  users: site.users
};

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

exports.transaction = function(req, res, next) {
  console.log(req);
  res.json('Saved');
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

exports.user = function(res, req, next) {

};

exports.users = function(res, req, next) {
  User.find((err, users) => {
    if (err) {
      console.log(err);
    }
    res.json({users: users});
  });
};