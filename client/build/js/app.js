'use strict';
const $ = require('jquery');
const _ = require('underscore');
const livestamp = require('livestamp');
const groups = require('./groups');
const geoposition = require('./geoposition');
const cloq = require('cloq');
const transaction = require('./transaction');
const searchUsers = require('./search-users');

$(document).on('ready', () => {
  transaction();
  geoposition();
  searchUsers();
  groups.init();
});
