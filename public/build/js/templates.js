let Handlebars = require('handlebars');
let helpers = require('hbs-helpers');

module.exports = (() => {
  for (let fn in helpers) {
    Handlebars.registerHelper(fn, helpers[fn]);
  }

  return Handlebars;
}());


