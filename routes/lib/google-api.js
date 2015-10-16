'use strict';
let request = require('request');
let CLIENT_ID = process.env.CAUSEWAY_CLIENT_ID;
let CLIENT_SECRET = process.env.CAUSEWAY_CLIENT_SECRET;
let API_KEY = process.env.CAUSEWAY_API_KEY;

module.exports.vicinity = (lat, long, user, res) => {

  let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=500&key=${API_KEY}`;
  let req = new Promise(function(resolve, reject) {
    request(url, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        let data = JSON.parse(body);
        let results = data.results;
        if (results) {
          resolve(results[0].vicinity);
        }
      }
    });
  });
  req.then(function(vicinity) {
    user.geo.vicinity = vicinity;
    user.save((err, user) => {
      if (err) {
        console.log(err);
        return err;
      }
      else {
        console.log('===========', user);
        res.json(user);
      }
    });
  });
};
