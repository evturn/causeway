'use strict';
const express = require('express');
const passport = require('passport');
const o_O = require('./server/config');
const locals = require('./server/lib/locals');
const app = module.exports = express();

app.engine('hbs', o_O.hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');
app.set('port', o_O.port);
app.use('/', o_O.static.dist);
app.use('/', o_O.static.hbs);
app.use(o_O.session);
app.use(o_O.urlencoded);
app.use(o_O.cookieParser);
app.use(o_O.bodyParser);
app.use(o_O.logger);
app.use(passport.initialize());
app.use(passport.session());
o_O.builder(app);
app.use(locals.activePage);
o_O.router(app);
app.listen(o_O.port, o_O.isListening());