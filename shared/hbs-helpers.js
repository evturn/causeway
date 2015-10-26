'use strict';
let moment = require('./moment.isoduration');
let _ = require('underscore');
let Handlebars = require('handlebars');
let utils = require('./utils');
let jstz = require('jstimezonedetect');
let cloq = require('./cloq');

exports.currency = (number) => {
  if (number === false) {
    return '';
  }

  number = ('' + number).replace(/[^0-9+\-Ee.]/g, '');
  let n = !isFinite(+number) ? 0 : +number;
  let prec = 0;
  let sep = ' ';
  let dec = '.';
  let s = '';
  let toFixedFix = (n, prec) => {
    let k = Math.pow(10, prec);
    return '' + (Math.round(n * k)) / k;
  };

  if (prec) {
    s = toFixedFix(n, prec);
  } else {
    s = '' + Math.round(n);
  }
  s = s.split('.');

  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] = s[1] + new Array(prec - s[1].length + 1).join('0');
  }

  return s.join(dec);
};

exports.monthAndDay = (date) => {
  return cloq.monthAndDay(date);
};

exports.digitalClock = (time) => {
  return cloq.digital(time);
};

exports.kelvinToFarenheit = (kelvin) => {
  let degrees = (kelvin - 273.15) * 1.8000 + 32.00;
  let number = degrees.toFixed();
  let temp = `${number}&#8457;`;
  return temp;
};

exports.tz = () => {
  let tz = jstz.jstz;
  return tz.determine().name();
};

exports.ts = (milliseconds) => {
  let ms = parseInt(milliseconds);
  let humanReadable = moment(ms).unix();
  return humanReadable;
};

exports.eq = function(first, second, options) {
  if (options.hash.firstKey) {
      first = first[options.hash.firstKey];
  }
  if (options.hash.secondKey) {
      second = second[options.hash.secondKey];
  }
  if (options.hash.firstAppend) {
      first += '' + options.hash.firstAppend;
  }
  if (options.hash.secondAppend) {
      second += '' + options.hash.secondAppend;
  }
  if (first === second) {
      return options.fn(this);
  }
  else {
      return options.inverse(this);
  }
};

exports.ne = (first, second, options) => {
  if (options.hash.roundDate) {
    options.hash.round = options.hash.roundDate;
    first = new Date(first).getTime();
    second = new Date(second).getTime();
  }

  if (options.hash.round) {
    first = Math.round(first / options.hash.round);
    second = Math.round(second / options.hash.round);
  }
  if (first !== second) {
    return options.fn(this);
  }
  else {
    return options.inverse(this);
  }
};

exports.gt = function(first, second, options) {
  if (first > second) {
      return options.fn(this);
  }
  else {
      return options.inverse(this);
  }
};

exports.lt = function(first, second, options) {
  if (first < second) {
      return options.fn(this);
  }
  else {
      return options.inverse(this);
  }
};

exports.set = function() {
  let args = Array.prototype.slice.call(arguments, 0);
  args.pop();
  let key = args.shift();
  while (!this[key] && args.length) {
    this[key] = args.shift();
  }
  return '';
};

exports.log = function() {
  let args = Array.prototype.slice.call(arguments, 0);
  args.pop();
  console.log.apply(console, args);
  args.unshift('========HANDLEB0RS=========');
  return '';
};

exports.eachUpTo = function(ary, max, options) {
  if(!ary || ary.length === 0) {
    return options.inverse(this);
  }

  var result = [ ];
  var data = null;
  for(var i = 0; i < max && i < ary.length; ++i) {
    data = Handlebars.createFrame(options.data || {});
    data.upto_index = i;
    data.upto_index_from_1 = (i + 1);

    if (options.hash) {
      _.extend(data, options.hash);
    }

    result.push(options.fn(ary[i], { data:data }));
  }

  return result.join('');
};