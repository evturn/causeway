let Handlebars = require('handlebars');
let data = null;
let components = {
  clock: {
    url: 'mod-clock.hbs',
    el: '.mod-clocks-el'
  },
  weather: {
    url: 'mod-weather.hbs',
    el: '.mod-weather-el'
  },
  profileDetails: {
    url: 'mod-profile-location.hbs',
    el: '.mod-profile__details-el'
  },
  expRecord: {
    url: 'component-exp-record.hbs',
    el: '.records'
  },
  expTransaction: {
    url: 'mod-exp-transaction.hbs',
    el: '.transaction'
  }
};

let geoposition = {
  cachedTemplates: [],
  init() {
    this.getCoordinates();
  },
  getCoordinates() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.saveCoordinates(position);
      });
    }
  },
  saveCoordinates(position) {
    $.ajax({
      type: 'POST',
      url: '/geoposition',
      data: position,
      dataType: 'json',
      success(response) {
        data = response;
        geoposition.loadTemplate(components.clock);
        geoposition.loadTemplate(components.weather);
        geoposition.loadTemplate(components.profileDetails);
      },
      error(err) {
        console.log(err);
      }
    });
  },
  loadTemplate(component) {
    let file = component.url;
    if (this.cachedTemplates[file]) {
      return updateBrowser(this.cachedTemplates[file]);
    }
    $.get(file, (contents) => {
      this.cachedTemplates[file] = Handlebars.compile(contents);
      let template = this.cachedTemplates[file];
      this.updateBrowser(component, template);
    });
  },
  updateBrowser(component, template) {
    let page = document.querySelector('body').className;
    let $el = $(component.el);

    switch (page) {
      case 'page-now':
        $el.html(template(data));
        break;
      case 'page-profile':
        $el.html(template(data));
        break;
    }
  }
};

module.exports = geoposition;