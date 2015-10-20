'use strict';
let Handlebars = require('handlebars');
let helpers = require('./hbs-helpers');

module.exports = {
  clock: {
    url: 'component-clock.hbs',
    el: '.mod-clocks'
  },
  weather: {
    url: 'component-weather.hbs',
    el: '.mod-weather'
  },
  profileLocation: {
    url: 'component-profile-location.hbs',
    el: '.profile__details-location'
  },
  record: {
    url: 'component-record.hbs',
    el: '.mod-records'
  },
  transaction: {
    url: 'component-transaction.hbs',
    el: '.mod-transaction'
  },
  group: {
    url: 'component-group.hbs',
    el: '.mod-groups'
  },
  helpers: (() => {
    for (let fn in helpers) {
      Handlebars.registerHelper(fn, helpers[fn]);
    }
    return Handlebars;
  }())
};
