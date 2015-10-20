'use strict';
let express = require('express');
let mongoose = require('mongoose');
let passport = require('passport');
let config = require('./server/config');
let app = module.exports = express();

config.mongo(mongoose);
app.engine('hbs', config.hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');
app.set('port', config.port);
app.use('/', config.static.dist);
app.use('/', config.static.hbs);
app.use(config.urlencoded);
app.use(config.cookieParser);
app.use(config.bodyParser);
app.use(config.logger);
app.use(config.session);
app.use(passport.initialize());
app.use(passport.session());
require('./server/routes')(app);

app.listen(config.port, () => {
  console.log('Express listening on 3000');
});