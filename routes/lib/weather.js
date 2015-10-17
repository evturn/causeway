'use strict';
let request = require('request');
let API_KEY = process.env.CAUSEWAY_WEATHER_API_KEY;
let key = `&id=524901&APPID=${API_KEY}&mode=json`;

module.exports.byCoords = (latitude, longitude) => {

  let url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}${key}`;
  request(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      let data = JSON.parse(body);
      console.log(data);
    }
  });
};