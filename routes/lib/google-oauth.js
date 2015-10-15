'use strict';
let passport = require('passport');
let Strategy = require('passport-google-oauth').OAuth2Strategy;
let scope = {scope: ['https://www.googleapis.com/auth/plus.login']};
let credentials = {
  clientID: process.env.CAUSEWAY_CLIENT_ID,
  clientSecret: process.env.CAUSEWAY_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google"
};

passport.use(new Strategy(credentials,
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      console.log(profile);
      return done(null, profile);
    });
  }));


module.exports.login = passport.authenticate('google', scope);
module.exports.callback = passport.authenticate('google', {failureRedirect: '/travel'});