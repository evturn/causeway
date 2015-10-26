const components = require('components');
const render = require('./render');
const xhr = require('./xhr');


const $searchButton = $('#search-users-button');
const $searchInput = $('#search-users-input');

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
};

const performSearch = (params) => {

  let callback = (data) => {
    let component = components.searchUsers;
    $searchInput.val('');
    $(component.el).empty();
    let users = data.users;
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