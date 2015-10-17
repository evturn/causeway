'use strict';
let moment = require('./moment.isoduration');
let jstz = require('jstimezonedetect');

let _T = moment();

let isPM = () => {
    let h = _T.hour();
    let isPM = h >= 12;
    return isPM;
  }();

let meridian = () => {
    let h = _T.hour();
    let meridian = isPM ? 'PM' : 'AM';
    return meridian;
  }();

let minutes = () => {
    return _T.minutes();
  }();

let hours = () => {
  let h = _T.hour();

  if (h === 0) {
    return 12;
  }
  else if (isPM) {
    return h - 12;
  }
  else {
    return h;
  }
}();

module.exports = {
  isPM: isPM,
  meridian: meridian,
  minutes: minutes,
  hours: hours,
  timezone: () => {
    let tz = jstz.jstz.determine();
    let timezone = tz.name();
    return timezone;
  },
  digital: () => {
    let clock = `${hours}:${minutes} ${meridian}`;
    return clock;
  },
  toDigital: (time) => {
    return moment(time);
  }
};