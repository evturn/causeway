let $ = require('jquery');
let _ = require('underscore');
let Handlebars = require('handlebars');
let helpers = require('hbs-helpers');
let utils = require('utils');
let livestamp = require('livestamp');
let geoposition = require('./geoposition');
let cloq = require('cloq');
let transaction = require('./transaction');

(() => {
  for (let fn in helpers) {
    Handlebars.registerHelper(fn, helpers[fn]);
  }
}());

transaction.init();
// geoposition.init();