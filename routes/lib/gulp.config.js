'use strict';

let gulp = require('gulp'),
    gutil = require('gulp-util'),
    $ = require('gulp-load-plugins')();

exports.paths = {
  dest: {
    css: 'public/dist/css',
    js: 'public/dist/js',
    img: 'public/dist/img'
  },
  less: {
    src: 'public/build/less/*.less',
    watch: 'public/build/less/**/*.less',
    filename: 'style.css',
    min: 'style.min.css'
  },
  eslint: {
    src: [
      'public/build/js/**/*.js',
      '!public/build/js/web_modules/**/*.js',
      'routes/**/*.js',
      'shared/**/*.js',
      'gulpfile.js',
      'server.js',
      'webpack.config.js'
    ]
  },
  bundle: {
    src: 'public/dist/js/**/*.js'
  },
  img: {
    src: 'public/build/img/*'
  }
};

exports.opts = {
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