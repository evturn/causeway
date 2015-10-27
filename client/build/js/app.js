'use strict';
const $ = require('jquery');
const _ = require('underscore');
const livestamp = require('livestamp');
const cloq = require('cloq');
const geoposition = require('./geoposition');
const transaction = require('./transaction');
const searchUsers = require('./search-users');

$(document).on('ready', () => {
  transaction();
  geoposition();
  searchUsers();
});
