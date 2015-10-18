'use strict';
let Handlebars = require('handlebars');

module.exports = (component, data) => {
  let cachedTemplates = [];

  let updateBrowser = (component, template) => {
    let page = document.querySelector('body').className;
    let $el = $(component.el);

    switch (page) {
      case 'page-now':
        $el.html(template(data));
        break;
      case 'page-profile':
        $el.html(template(data));
        break;
      case 'page-expenses':
        $el.prepend(template(data));
        break;
    }
  };

  let loadTemplate = (component) => {
    let file = component.url;
    if (cachedTemplates[file]) {
      return updateBrowser(cachedTemplates[file]);
    }

    $.get(file, (contents) => {
      cachedTemplates[file] = Handlebars.compile(contents);
      let template = cachedTemplates[file];
      updateBrowser(component, template);
    });
  };

  return loadTemplate(component);
};