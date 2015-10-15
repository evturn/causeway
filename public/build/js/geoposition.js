let $geoContainer = $('.geoposition');
let Handlebars = require('handlebars.min');
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
        console.log(position);
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
    $geoContainer.html(template);
  }
};

module.exports = geoposition;