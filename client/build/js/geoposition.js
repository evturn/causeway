'use strict';
const Handlebars = require('handlebars');
const components = require('components');
const render = require('./render');
const xhr = require('./xhr');

let cachedTemplates: [];

const getCoordinates = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      saveCoordinates(position);
    });
  }
};

const saveCoordinates = (position) => {
  let callback = (data) => {
    render(components.clock, data);
    render(components.weather, data);
    render(components.profileLocation, data);
  };

  xhr.post({
    url: '/geoposition',
    data: position,
    dataType: 'json',
    callback: callback
  });
};

module.exports = getCoordinates;