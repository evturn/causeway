let $ = require('jquery');
let _ = require('underscore');
let templates = require('./templates');
let utils = require('utils');
let livestamp = require('livestamp');
// let geoposition = require('./geoposition');
let cloq = require('cloq');
let transaction = require('./transaction');

transaction.init();