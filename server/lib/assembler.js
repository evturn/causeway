'use strict';
let users = require('../../tools/resources/users.json');
let transactions = require('../../tools/resources/transactions.json');
let components = require('../../shared/components');

let nav = [
    {name: 'Now',      icon: 'fa fa-flash',       path: 'now'},
    {name: 'Expenses', icon: 'fa fa-money',       path: 'expenses'},
    {name: 'Travel',   icon: 'fa fa-plane',       path: 'travel'},
    {name: 'Planner',  icon: 'fa fa-map',         path: 'planner'},
    {name: 'Notes',    icon: 'fa fa-sticky-note', path: 'notes'},
    {name: 'Me',       icon: 'fa fa-user',        path: 'profile'}
];


let site = {
  nav: nav,
  groups: [
    {
      _id: '4252ce4ce4cfcd16f55cfa3d',
      name: 'Thug Nation',
      users: users,
      transactions: transactions,
      userCount: 3
    },
    {
      _id: '4254ce4ce4cfcd16f55cfa3d',
      name: 'Montreal',
      users: users,
      transactions: transactions,
      userCount: 3
    }
  ],
  group: {
    _id: '4252ce4ce4cfcd16f55cfa3d',
    name: 'Thug Nation',
    users: users,
    transactions: transactions,
    userCount: 3
  },
  components: components,
  pages: [
    'now',
    'expenses',
    'travel',
    'planner',
    'notes',
    'profile'
  ],
  activePage: ''
};

module.exports = site;