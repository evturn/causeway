'use strict';

let site = {};

let menu = [
    {name: 'Now',      icon: 'fa fa-flash'},
    {name: 'Expenses', icon: 'fa fa-krw'},
    {name: 'Travel',   icon: 'fa fa-plane'},
    {name: 'Planner',  icon: 'fa fa-map'},
    {name: 'Note',     icon: 'fa fa-sticky-note'},
    {name: 'Me',       icon: 'fa fa-user'}
];

site.menu = menu;
site.activePage = '';

module.exports = site;