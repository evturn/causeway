'use strict';

module.exports.init = (exphbs) => {
  return exphbs;
};

module.exports.exposeTemplates = (req, res, next) => {
  let hbs = init();
  hbs.getTemplates('views/partials/', {
    cache      : app.enabled('view cache'),
    precompiled: true
  })
  .then(function(templates) {
    let extRegex = new RegExp(hbs.extname + '$');
    templates = Object.keys(templates).map(function (name) {
      let precompiled = {
        name    : name.replace(extRegex, ''),
        template: templates[name]
      };
      return precompiled;
    });
    if (templates.length) {
      res.locals.templates = templates;
    }
    setImmediate(next);
  })
  .catch(next);
};