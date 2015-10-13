'use strict';

var google = require('googleapis');
var OAuth2Client = google.auth.OAuth2;
var plus = google.plus('v1');
var CLIENT_ID = process.env.CAUSEWAY_CLIENT_ID;
var CLIENT_SECRET = process.env.CAUSEWAY_CLIENT_SECRET;
var API_KEY = process.env.CAUSEWAY_API_KEY;
var REDIRECT_URL = 'http://localhost:3000/auth/google';
var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

exports.generateAuthUrl = function() {

  var url = oauth2Client.generateAuthUrl({
    access_type: 'offline', // will return a refresh token
    scope: [
      'https://www.googleapis.com/auth/plus.me',
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/drive'
    ]
  });

  return url;
};

exports.getOAuth2Client = function() {
  return oauth2Client;
};

exports.callback = function() {
  plus.people.get({ userId: 'me', auth: oauth2Client }, function(err, profile) {
    if (err) {
      console.log('An error occured', err);
      return;
    }
    console.log(profile);
  });
};