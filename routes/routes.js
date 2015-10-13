'use strict';

let express = require('express'),
    middleware = require('./middleware'),
    app = express.Router();

exports.app = app.get('/', middleware.index);