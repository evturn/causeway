'use strict';

module.exports = {

  farenheit: function(kelvin) {
    let degrees = (kelvin - 273.15) * 1.8000 + 32.00;
    let number = degrees.toFixed();
    let temp = `${number}&#8457;`;
    return temp;
  }
};