let $geoContainer = $('.geoposition');
let $vicinity = $('#vicinity');
let Handlebars = require('handlebars');
let url = 'geoposition.hbs';
let data = null;

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
        geoposition.loadTemplate(url);
      },
      error(err) {
        console.log(err);
      }
    });
  },
  loadTemplate(url) {
    if (this.cachedTemplates[url]) {
      return updateBrowser(this.cachedTemplates[url]);
    }
    $.get(url, (contents) => {
      this.cachedTemplates[url] = Handlebars.compile(contents);
      this.updateBrowser(this.cachedTemplates[url]);
    });
  },
  updateBrowser(template) {
    let page = document.querySelector('body').className;
    switch (page) {
      case 'page-now':
        $vicinity.html(data.user.geo.vicinity);
        break;
      case 'page-profile':
        $geoContainer.html(template(data));
        break;
    }
  }
};

module.exports = geoposition;