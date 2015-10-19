'use strict';
let dir = require('node-dir');

module.exports = (req, res, next) => {
  let templates = [];
  dir.readFiles(__dirname, {
    match: /.hbs$/,
    shortName: true
  },
  (err, content, next) => {
    if (err) {
      throw err;
    }
    let template = {};
    template.content = content;
    templates.push(template);
    next();
  },
  (err, files) => {
    if (err) {
      throw err;
    }
  let precompiled = {
    templates: templates,
    urls: files
  };
  res.locals.templates = precompiled;
  setImmediate(next);
  });
};