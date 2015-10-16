let $ = require('jquery');
let _ = require('underscore');
let Handlebars = require('handlebars');
let helpers = require('hbs-client')();
let utils = require('utils');
let livestamp = require('livestamp');
let geoposition = require('./geoposition');
let cloq = require('./cloq');

geoposition.init();

console.log(cloq.timezone);
console.log(cloq.time);
console.log(cloq.minutes);
console.log(cloq.hours);
console.log(cloq.isPM);
console.log(cloq.meridian);
console.log(cloq);