'use strict';
let controllers = require('../controllers');
let oauth = require('../lib/google-oauth');
let urlencoded = require('body-parser').urlencoded({extended: false});

module.exports = (app) => {

  app.get('/',                      oauth.getAuth, controllers.pages.now);
  app.get('/auth/google',           oauth.init);
  app.get('/auth/google/callback',  oauth.authenticate, controllers.api.google);
  app.post('/geposition',           oauth.getAuth, urlencoded, controllers.api.geoposition);

  app.post('/expenses/new',         oauth.getAuth, controllers.transactions.create);

  app.get('/now',                   oauth.getAuth, controllers.pages.now);
  app.get('/expenses',              oauth.getAuth, controllers.pages.expenses);
  app.get('/travel',                oauth.getAuth, controllers.pages.travel);
  app.get('/planner',               oauth.getAuth, controllers.pages.planner);
  app.get('/notes',                 oauth.getAuth, controllers.pages.notes);
  app.get('/profile',               oauth.getAuth, controllers.pages.profile);

  app.get('/users/',                oauth.getAuth, controllers.users.users);
  app.get('/users/:id',             oauth.getAuth, controllers.users.user);

};