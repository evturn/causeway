'use strict';
let express = require('express');
let middleware = require('./middleware');
let oauth = require('./lib/google-oauth');
let app = express.Router();
let auth = express.Router();

app.get('/',         oauth.getAuth, middleware.now);
app.get('/now',      oauth.getAuth, middleware.now);
app.get('/expenses', oauth.getAuth, middleware.expenses);
app.get('/travel',   oauth.getAuth, middleware.travel);
app.get('/planner',  oauth.getAuth, middleware.planner);
app.get('/notes',    oauth.getAuth, middleware.notes);
app.get('/profile',  oauth.getAuth, middleware.profile);

auth.get('/google',           oauth.init);
auth.get('/google/callback',  oauth.authenticate, middleware.google);

exports.app = app;
exports.auth = auth;