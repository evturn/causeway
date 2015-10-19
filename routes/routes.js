'use strict';
let express = require('express');
let middleware = require('./middleware');
let oauth = require('./lib/google-oauth');
let urlencoded = require('body-parser').urlencoded({extended: false});
let app = express.Router();
let auth = express.Router();
let geo = express.Router();
let users = express.Router();
let sendTemplates = require('../shared/templates');

auth.get('/google',           oauth.init);
auth.get('/google/callback',  oauth.authenticate, middleware.google);

app.get('/',         sendTemplates, oauth.getAuth, middleware.now);
app.get('/now',      sendTemplates, oauth.getAuth, middleware.now);
app.get('/expenses', sendTemplates, oauth.getAuth, middleware.expenses);
app.post('/expenses/new', sendTemplates, oauth.getAuth, middleware.transaction);
app.get('/travel',   oauth.getAuth, middleware.travel);
app.get('/planner',  oauth.getAuth, middleware.planner);
app.get('/notes',    oauth.getAuth, middleware.notes);
app.get('/profile',  oauth.getAuth, middleware.profile);

users.get('/',       oauth.getAuth, middleware.users);
users.get('/:id',    oauth.getAuth, middleware.user);

geo.post('/', oauth.getAuth, urlencoded, middleware.geoposition);

exports.app = app;
exports.auth = auth;
exports.geo = geo;
exports.users = users;