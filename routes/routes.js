'use strict';

let express = require('express');
let middleware = require('./middleware');
let oauth = require('./lib/google-oauth');
let app = express.Router();
let auth = express.Router();

function getAuth(req, res, next) {
  if (!req.user) {
    res.redirect('/auth/google');
  }
  else {
    next();
  }
};

app.get('/',         getAuth, middleware.now);
app.get('/now',      getAuth, middleware.now);
app.get('/expenses', getAuth, middleware.expenses);
app.get('/travel',   getAuth, middleware.travel);
app.get('/planner',  getAuth, middleware.planner);
app.get('/notes',    getAuth, middleware.notes);
app.get('/profile',  getAuth, middleware.profile);

auth.get('/google',           oauth.init);
auth.get('/google/callback',  oauth.authenticate, middleware.google);

exports.app = app;
exports.auth = auth;