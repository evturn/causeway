'use strict';
let passport = require('passport');
let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
let User = require('./user');

let google = {
  params: {
    scope: [
      'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/drive'
    ],
    access_type: 'offline'
  },
  credentials: {
    clientID: process.env.CAUSEWAY_CLIENT_ID,
    clientSecret: process.env.CAUSEWAY_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  redirects: {
    successRedirect: '/profile',
    failureRedirect: '/travel'
  },
  createUser(data, done) {
    let user = new User();
    user.gid        = data.id,
    user.avatar     = data.image.url,
    user.coverPhoto = data.cover.coverPhoto.url,
    user.gender     = data.gender,
    user.location   = data.placesLived[0].value,
    user.fullname   = data.displayName,
    user.token      = data.accessToken,
    user.name.first = data.name.givenName,
    user.name.last  = data.name.familyName;
    user.token      = data.token;
    user.save(function(err, user) {
      if (err) {
        return err;
      }
      else {
        return done(null, user);
      }
    });
  },
  getAuth(req, res, next) {
    if (!req.user) {
      res.redirect('/auth/google');
    }
    else {
      next();
    }
  }
};

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy(google.credentials,
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      User.findOne({googleId: profile.gid}, function(err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        }
        else {
          let data = JSON.parse(profile._raw);
          data.token = accessToken;
          google.createUser(data, done);
        }
      });
    });
}));

module.exports.init = passport.authenticate('google', google.params);
module.exports.authenticate = passport.authenticate('google', google.redirects);
module.exports.getAuth = google.getAuth;