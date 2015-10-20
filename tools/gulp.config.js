'use strict';

let gulp = require('gulp'),
    gutil = require('gulp-util'),
    $ = require('gulp-load-plugins')();

let paths = {
  dest: {
    css: 'client/dist/css',
    js: 'client/dist/js',
    img: 'client/dist/img'
  },
  less: {
    src: 'client/build/less/*.less',
    watch: 'client/build/less/**/*.less',
    filename: 'style.css',
    min: 'style.min.css'
  },
  eslint: {
    src: [
      'client/build/js/**/*.js',
      '!client/build/js/web_modules/**/*.js',
      'routes/**/*.js',
      'shared/**/*.js',
      'gulpfile.js',
      'server.js',
      'webpack.config.js'
    ]
  },
  js: {
    watch: 'client/dist/js/bundle.js'
  },
  img: {
    src: 'client/build/img/*'
  },
  views: {
    watch: 'views/**/*.hbs'
  }
};

let reload = {
  js: paths.js.watch,
  less: paths.less.watch,
  views: paths.views.watch
};

let opts = {
  browserSync: {
      proxy: 'localhost:3000',
      port: 3000
  },
  babel: {
    modules: 'common'
  },
  plumber: {
    errorHandler: function(err) {
      gutil.beep();
      console.log(err);
      $.notify(err);
      this.emit('end');
    }
  },
  notify: {
    eslint: function(file) {
      if (file.eslint.errorCount === 0) {
        return false;
      }
      let errors = file.eslint.messages.map(function(data) {
        return '(' + data.line + ':' + data.column + ') ' + data.message;
      }).join('\n');

      return file.relative + ' (' + file.eslint.errorCount + ' errors)\n' + errors;
    }
  },
  imagemin: {
    progressive: true
  },
  autoprefixer: {
    browsers: [
      '> 1%',
      'last 2 versions',
      'firefox >= 4',
      'safari 7',
      'safari 8',
      'IE 8',
      'IE 9',
      'IE 10',
      'IE 11'
    ],
    cascade: false
  },
};

module.exports.paths = paths;
module.exports.opts = opts;
module.exports.reload =reload;