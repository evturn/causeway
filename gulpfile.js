'use strict';
let gulp = require('gulp');
let gutil = require('gulp-util');
let browserSync = require('browser-sync').create();
let $ = require('gulp-load-plugins')();
let runSequence = require('run-sequence');
let paths = require('./tools/gulp.config').paths;
let opts = require('./tools/gulp.config').opts;
let reload = require('./tools/gulp.config').reload;

//////////////////////////////////////////////
// Callback
//////////////////////////////////////////////
let fin = () => {
  console.log('Finished with that.');
};

//////////////////////////////////////////////
// Default
//////////////////////////////////////////////
gulp.task('default', ['watch:dev', 'browser:init']);

//////////////////////////////////////////////
// Watch Dev
//////////////////////////////////////////////
gulp.task('watch:dev', () => {
  gulp.watch(paths.js.watch, ['browser:reload']),
  gulp.watch(paths.less.watch, ['run:less']);
  gulp.watch(paths.eslint.src, ['eslint']);
});

//////////////////////////////////////////////
// Browser Sync
//////////////////////////////////////////////
gulp.task('browser:init', () => {
  browserSync.init(opts.browserSync);
});

gulp.task('browser:reload', () => {
  browserSync.reload();
});

//////////////////////////////////////////////
// LESS
//////////////////////////////////////////////
gulp.task('run:less', function(fin) {
  runSequence('less', 'browser:reload', () => {
    fin();
  });
});

gulp.task('less', function() {
  return gulp.src(paths.less.src)
    .pipe($.plumber(opts.plumber))
    .pipe($.less())
    .pipe($.rename(paths.less.filename))
    .on('error', opts.plumber.errorHandler)
    .pipe($.autoprefixer(opts.autoprefixer))
    .pipe($.cssmin())
    .pipe(gulp.dest(paths.dest.css)).on('error', gutil.log);
});

//////////////////////////////////////////////
// ESLint
//////////////////////////////////////////////
gulp.task('eslint', function() {
  return gulp.src(paths.eslint.src)
    .pipe($.plumber(opts.plumber))
    .pipe($.eslint())
    .on('error', opts.plumber.errorHandler)
    .pipe($.eslint.format('stylish'))
    .pipe($.notify(opts.notify.eslint));
});

//////////////////////////////////////////////
// Imgmin
//////////////////////////////////////////////
gulp.task('img', function() {
  return gulp.src(paths.img.src)
  .pipe($.imagemin(opts.imagemin))
  .on('error', opts.plumber.errorHandler)
  .pipe(gulp.dest(paths.dest.img));
});