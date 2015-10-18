'use strict';
let moment = require('./moment.isoduration');
let _ = require('underscore');
let utils = require('./utils');
let jstz = require('jstimezonedetect');
let cloq = require('./cloq');
let thermo = require('./thermo');

exports.digitalClock = (time) => {
  return cloq.digital(time);
};

exports.kelvinToFarenheit = (kelvin) => {
  return thermo.farenheit(kelvin);
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
  args.unshift('handlebars log:');
  console.log.apply(console, args);
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