'use strict';
let controllers = require('../controllers');
let oauth = require('../lib/google-oauth');
let urlencoded = require('body-parser').urlencoded({extended: false});
let locals = require('../lib/res-locals');

module.exports = (app) => {

  app.get('/',                      oauth.getAuth, controllers.pages.now);
  app.get('/auth/google',           oauth.init);
  app.get('/auth/google/callback',  oauth.authenticate, controllers.api.auth);
  app.post('/geoposition',          oauth.getAuth, urlencoded, controllers.api.geoposition);

  app.post('/expenses/new',         oauth.getAuth, controllers.transactions.create);

  app.get('/now',                   oauth.getAuth, locals.groups, controllers.pages.now);
  app.get('/expenses',              oauth.getAuth, locals.groups, controllers.pages.expenses);
  app.get('/travel',                oauth.getAuth, locals.groups, controllers.pages.travel);
  app.get('/planner',               oauth.getAuth, locals.groups, controllers.pages.planner);
  app.get('/notes',                 oauth.getAuth, locals.groups, controllers.pages.notes);
  app.get('/profile',               oauth.getAuth, locals.groups, controllers.pages.profile);

  app.get('/users/',                oauth.getAuth, controllers.users.users);
  app.get('/users/:id',             oauth.getAuth, controllers.users.user);
  app.get('/logout',                oauth.getAuth, controllers.users.logout);

  app.post('/groups',               oauth.getAuth, locals.groups, urlencoded, controllers.groups.create);
  app.get('/groups/:id',            oauth.getAuth, locals.groups, locals.group, urlencoded, controllers.groups.change);

};