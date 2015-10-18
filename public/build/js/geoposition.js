let Handlebars = require('handlebars');
let components = require('components');
let render = require('./render');

let geoposition = {
  cachedTemplates: [],
  init() {
    this.getCoordinates();
  },
  getCoordinates() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.saveCoordinates(position);
      });
    }
  },
  saveCoordinates(position) {
    $.ajax({
      type: 'POST',
      url: '/geoposition',
      data: position,
      dataType: 'json',
      success(data) {
        render(components.clock, data);
        render(components.weather, data);
        render(components.profileDetails, data);
      },
      error(err) {
        console.log(err);
      }
    });
  }
};

module.exports = geoposition;