const xhr = require('./xhr');

const init = () => {
  let $searchButton = $('#search-users-button');
  let $searchInput = $('#search-users-input');

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
    console.log(data);
  };

  xhr.get({
    url: '/users',
    callback: callback,
    data: {name: params},
    dataType: 'json'
  });
};

module.exports = init;