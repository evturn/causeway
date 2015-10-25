'use strict';
let googleapi = require('../lib/google-api');
let weatherapi = require('../lib/weather');

exports.auth = (req, res, next) => {
  res.redirect('/now');
};

exports.geoposition = (req, res, next) => {
  let user = req.user;
  let latitude = req.body['coords[latitude]'];
  let longitude = req.body['coords[longitude]'];
  let timestamp = req.body.timestamp;

  user.geo.lat = latitude;
  user.geo.long = longitude;
  user.geo.lastSeen = timestamp;
  let p1 = new Promise((resolve, reject) => {
    let weather = weatherapi.byCoords(latitude, longitude, user, res);
    resolve(weather);
  });
};