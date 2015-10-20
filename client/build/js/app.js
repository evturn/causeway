let $ = require('jquery');
let _ = require('underscore');
let livestamp = require('livestamp');
let groups = require('./groups');
let geoposition = require('./geoposition');
let cloq = require('cloq');
let transaction = require('./transaction');


$(document).on('ready', () => {
  transaction.init();
  groups.init();
});