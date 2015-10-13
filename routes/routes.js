'use strict';

let express = require('express'),
    middleware = require('./middleware'),
    app = express.Router(),
    auth = express.Router();

app.get('/', middleware.index);
app.get('/now', middleware.now);
app.get('/expenses', middleware.expenses);
app.get('/travel', middleware.travel);
app.get('/planner', middleware.planner);
app.get('/notes', middleware.notes);
app.get('/profile', middleware.profile);


auth.get('/google', middleware.google);

exports.app = app;
exports.auth = auth;