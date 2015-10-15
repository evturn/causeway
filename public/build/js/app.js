let $ = require('jquery');
let livestamp = require('livestamp');
let geoposition = require('./geoposition');
let Handlebars = require('handlebars.min');
let helpers = require('hbs-helpers');

geoposition.init();