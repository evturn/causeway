'use strict';

let handlebars = require('express-handlebars');

module.exports = {

  database: function(mongoose) {
    mongoose.connect('mongodb://localhost/marshallz');
    mongoose.connection.on('error',
      console.error.bind(console,
        'connection error:'));
    mongoose.connection.once('open',
      function callback() {
        console.log('DB connected');
    });
  },
  hbs: handlebars.create({
    defaultLayout: 'layout',
    extname: '.hbs',
    partialsDir: 'views/partials',
    layoutsDir: 'views/layouts'
  })

};