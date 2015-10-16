let moment = require('moment.isoduration');
let jstz = require('jstimezonedetect');

let _T = moment();

let timezone = () => {
  let tz = jstz.jstz.determine();
  let timezone = tz.name();
  return timezone;
}();

let isPM = () => {
  let h = _T.hour();
  let isPM = h > 12;
  return isPM;
}();

let meridian = () => {
  let h = _T.hour();
  let isPM = h > 12;
  let meridian = isPM ? 'PM' : 'AM';
  return meridian;
}();

let minutes = () => {
  return _T.minutes();
}();

let hours = () => {
  let h = _T.hour();
  let hours = isPM ? (h - 12) : h;
  return hours;
}();

let time = () => {
  let clock = `${hours}:${minutes} ${meridian}`;
  return clock;
}();

module.exports.timezone = timezone;
module.exports.time = time;
module.exports.isPM = isPM;
module.exports.meridian = meridian;
module.exports.hours = hours;
module.exports.minutes = minutes;