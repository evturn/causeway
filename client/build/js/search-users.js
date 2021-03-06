'use strict';
const components = require('components');
const render = require('./render');
const xhr = require('./xhr');
let $searchButton = $('#search-users-button');
let $searchInput = $('#search-users-input');
let $resultsItem = $('.search-users__results-item');
let $resultsContainer = $('.mod-search-users___results');

const init = () => {
  $searchInput.on('keypress', (e) => {
    if (e.keyCode === 13) {
      let params = $searchInput.val();
      performSearch(params);
    }
  });

  $searchButton.on('click', (e) => {
    e.preventDefault();
    let params = $searchInput.val();
    performSearch(params);
  });

  $resultsContainer.on('click', '.search-users__results-item', function(e) {
    e.preventDefault();
    let userId = $(this).data('id');
    let groupId = $resultsContainer.data('group-id');
    let params = {groupId, userId};
    selectUser(params);
  });
};

const selectUser = (params) => {
  let url = `/groups/${params.groupId}/users`;
  let callback = (data) => {
    console.log(data);
  };

  xhr.post({
    url: url,
    callback: callback,
    data: params,
    dataType: 'json'
  });
};

const performSearch = (params) => {
  let callback = (data) => {
    let component = components.searchUsers;
    let users = data.users;
    $searchInput.val('');
    $(component.el).empty();
    for (let user of users) {
      render(component, user);
    }
  };

  xhr.get({
    url: '/users',
    callback: callback,
    data: {name: params},
    dataType: 'json'
  });
};

module.exports = init;