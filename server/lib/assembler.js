'use strict';
let users = require('../../tools/resources/users.json');
let url = require('url');
let transactions = require('../../tools/resources/transactions.json');
let components = require('../../shared/components');

const store = {
  nav: [],
  pages: [],
  activePage: '',
  groups: [],
  group: {},
  components: [],
};

const nav = [
  {name: 'Now',      icon: 'fa fa-flash',       path: 'now'},
  {name: 'Expenses', icon: 'fa fa-money',       path: 'expenses'},
  {name: 'Travel',   icon: 'fa fa-plane',       path: 'travel'},
  {name: 'Planner',  icon: 'fa fa-map',         path: 'planner'},
  {name: 'Notes',    icon: 'fa fa-sticky-note', path: 'notes'},
  {name: 'Me',       icon: 'fa fa-user',        path: 'profile'}
];

const pages = [
  'now',
  'expenses',
  'travel',
  'planner',
  'notes',
  'profile'
];

let groups = [
  {
    _id: '4252ce4ce4cfcd16f55cfa3d',
    name: 'Thug Nation',
    users: users,
    transactions: transactions,
    userCount: 3
  },
  {
    _id: '4222ce4ce4cfcd16f55cfa3d',
    name: 'Quest On My Chest',
    users: users,
    transactions: transactions,
    userCount: 2
  },
  {
    _id: '4254ce4ce4cfcd16f55cfa3d',
    name: 'Montreal',
    users: users,
    transactions: transactions,
    userCount: 3
  }
];

const assemble = (req, res, next) => {
  let urlStr = url.parse(req.originalUrl);
  let pathname = urlStr.pathname;
  let activePage = pathname[0] == '/' ? pathname.substr(1) : pathname;
  res.locals.nav = nav;
  res.locals.pages = pages;
  res.locals.activePage = activePage;
  res.locals.user = req.user;
  res.locals.groups = groups;
  res.locals.group = groups[0];
  res.locals.components = components;
  next();
};

module.exports.assemble = assemble;