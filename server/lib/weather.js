'use strict';
let request = require('request');
let API_KEY = process.env.CAUSEWAY_WEATHER_API_KEY;
let key = `&id=524901&APPID=${API_KEY}&mode=json`;

module.exports.byCoords = (latitude, longitude, user, res) => {

  let url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}${key}`;
  let req = new Promise(function(resolve, reject) {
    request(url, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        let data = JSON.parse(body);
        if (data) {
          resolve(data);
        }
      }
    });
  });
  req.then((data) => {
    user.climate.vicinity = data.name;
    user.climate.temp = data.main.temp;
    user.climate.humidity = data.main.humidity;
    user.climate.high = data.main.temp_max;
    user.climate.low = data.main.temp_min;
    user.climate.description = data.weather[0].description;
    user.climate.sunrise = data.sys.sunrise;
    user.climate.sunset = data.sys.sunset;
    user.climate.country = data.sys.country;
    user.climate.wind = data.wind.speed;
    user.save((err,user) => {
      if (err) {
        console.log(err);
        return err;
      }
      else {
        console.log(user);
        res.json({user: user});
      }
    });
  });
};