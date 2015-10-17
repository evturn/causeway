'use strict';
let moment = require('./moment.isoduration');
let jstz = require('jstimezonedetect');

const Cloq = {
  meridian: (time) => {
    let h = time.hour();
    let isPM = !!(h >= 12);
    let meridian = isPM ? 'PM' : 'AM';
    return meridian;
  },
  minutes: (time) => {
    let m = time.minutes();
    let minutes = m < 10 ? `0${m}` : m;
    return minutes;
  },
  hours: (time) => {
    let h = time.hour();
    let isPM = !!(h >= 12);
    if (h === 0) {
      return 12;
    }
    else if (isPM) {
      return h - 12;
    }
    else {
      return h;
    }
  },
  timezone: () => {
    let tz = jstz.jstz.determine();
    let timezone = tz.name();
    return timezone;
  },
  digital: (time) => {
    let date;
    if (typeof time !== 'string') {
      date = moment();
    }
    else {
      date = time ? moment(time * 1000) : moment();

    }
    let clock = `${Cloq.hours(date)}:${Cloq.minutes(date)} ${Cloq.meridian(date)}`;
    return clock;
  }
};

module.exports = Cloq;