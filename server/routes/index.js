'use strict';
let controllers = require('../controllers');
let oauth = require('../lib/google-oauth');
let urlencoded = require('body-parser').urlencoded({extended: false});
let locals = require('../lib/locals');

module.exports = (app) => {

  app.get('/',                      oauth.getAuth, controllers.pages.now);
  app.get('/auth/google',           oauth.init);
  app.get('/auth/google/callback',  oauth.authenticate, controllers.api.auth);
  app.post('/geoposition',          oauth.getAuth, urlencoded, controllers.api.geoposition);

  app.post('/expenses/new',         oauth.getAuth, locals.user, locals.group, controllers.transactions.create);

  app.get('/now',                   oauth.getAuth, locals.user, locals.groups, locals.group, locals.transactions, controllers.pages.now);
  app.get('/expenses',              oauth.getAuth, locals.user, locals.groups, locals.group, locals.transactions, controllers.pages.expenses);
  app.get('/travel',                oauth.getAuth, locals.user, locals.groups, locals.group, controllers.pages.travel);
  app.get('/planner',               oauth.getAuth, locals.user, locals.groups, locals.group, controllers.pages.planner);
  app.get('/notes',                 oauth.getAuth, locals.user, locals.groups, locals.group, controllers.pages.notes);
  app.get('/profile',               oauth.getAuth, locals.user, locals.groups, locals.group, controllers.pages.profile);

  app.get('/users/',                oauth.getAuth, urlencoded, locals.user, locals.group, controllers.users.users);
  app.get('/users/:id',             oauth.getAuth, locals.user, controllers.users.user);
  app.get('/logout',                oauth.getAuth, locals.user, controllers.users.logout);

  app.post('/groups',               oauth.getAuth, urlencoded, locals.user, locals.groups, locals.group, controllers.groups.create);
  app.get('/groups/:id',            oauth.getAuth, locals.user, locals.groups, locals.setGroup, locals.group, urlencoded, controllers.groups.change);
  app.post('/groups/:id/users',     oauth.getAuth, locals.user, locals.groups, locals.group, urlencoded, controllers.groups.addUser);
};