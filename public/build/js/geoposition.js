let $profileDetails = $('.mod-profile__details-el');
let $clock = $('.mod-clocks-el');
let $weather = $('.mod-weather-el');
let Handlebars = require('handlebars');
let data = null;
let component = {
  clock: {
    url: 'mod-clock.hbs',
    el: $clock
  },
  weather: {
    url: 'mod-weather.hbs',
    el: $weather
  },
  profileDetails: {
    url: 'mod-profile-location.hbs',
    el: $profileDetails
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
        geoposition.loadTemplate(component.clock);
        geoposition.loadTemplate(component.weather);
        geoposition.loadTemplate(component.profileDetails);
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
    let $el = component.el;

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