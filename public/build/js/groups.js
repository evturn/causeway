let xhr = require('./xhr');

const groups = {
  init() {
    let $switchTrigger = $('.profile__groups-switch-to');

    $switchTrigger.on('click', function(e) {
      // e.preventDefault();
      // groups.switchTo($(this));
    });
  },
  switchTo($this) {
    let url = $this.data('url');
    let name = $this.data('name');
    let callback = (data) => {
      console.log(data);
    };

    xhr.post({
      url: url,
      callback: callback,
      data: {name: name},
      dataType: 'json'
    });
  }
};

module.exports = groups;