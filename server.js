'use strict';
let express = require('express');
let mongoose = require('mongoose');
let passport = require('passport');
let config = require('./routes/lib/base');
let routes = require('./routes/routes');
let app = express();

config.mongo(mongoose);
app.set('port', config.port);
app.set('view engine', 'hbs');
app.set('views', 'views');
app.engine('hbs', config.hbs.engine);
app.use('/', config.static.dist);
app.use('/', config.static.hbs);
app.use(config.urlencoded);
app.use(config.cookieParser);
app.use(config.bodyParser);
app.use(config.logger);
app.use(config.session);
app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes.app);
app.use('/auth', routes.auth);
app.use('/geoposition', routes.geo);
app.listen(config.port, () => {
  console.log('Express listening on 3000');
});