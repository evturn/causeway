'use strict';
let $ = require('jquery');
let _ = require('underscore');
let livestamp = require('livestamp');
let groups = require('./groups');
let geoposition = require('./geoposition');
let cloq = require('cloq');
let transaction = require('./transaction');
const searchUsers = require('./search-users');

$(document).on('ready', () => {
  transaction.init();
  geoposition();
  searchUsers();
  groups.init();
});
