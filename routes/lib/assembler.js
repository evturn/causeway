'use strict';
let users = require('../../tools/resources/users.json');
let site = {};

let nav = [
    {name: 'Now',      icon: 'fa fa-flash',       path: 'now'},
    {name: 'Expenses', icon: 'fa fa-money',       path: 'expenses'},
    {name: 'Travel',   icon: 'fa fa-plane',       path: 'travel'},
    {name: 'Planner',  icon: 'fa fa-map',         path: 'planner'},
    {name: 'Note',     icon: 'fa fa-sticky-note', path: 'notes'},
    {name: 'Me',       icon: 'fa fa-user',        path: 'profile'}
];

site.users = users;
site.nav = nav;
site.activePage = '';

module.exports = site;