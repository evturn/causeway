'use strict';
const gulp = require('gulp');
const gutil = require('gulp-util');
const browserSync = require('browser-sync').create();
const $ = require('gulp-load-plugins')();
const runSequence = require('run-sequence');
const paths = require('./tools/gulp.config').paths;
const opts = require('./tools/gulp.config').opts;
const reload = require('./tools/gulp.config').reload;
const shell = require('gulp-shell');
const cb = () => { console.log('Finished with that.'); };

gulp.task('watch', ['webpack:watch', 'nodemon', 'gulp:watch', 'browser:init'], (cb) => {
  cb();
});

gulp.task('gulp:watch', () => {
  gulp.watch(paths.js.watch, ['browser:reload']),
  gulp.watch(paths.less.watch, ['run:less']);
  gulp.watch(paths.eslint.src, ['eslint']);
});

////////////////////////
// Shell Scripts
////////////////////////
gulp.task('nodemon', shell.task('nodemon server.js'));
gulp.task('webpack:watch',  shell.task('webpack --watch &'));

////////////////////////
// Browser Sync Init
////////////////////////
gulp.task('browser:init', () => {
  setTimeout(() => {
    console.log('Browser Sync initialized');
    browserSync.init(opts.browserSync);
  }, 9000);
});

////////////////////////
// Browser Sync Reload
////////////////////////
gulp.task('browser:reload', () => {
  browserSync.reload();
});

////////////////////////
// LESS
////////////////////////
gulp.task('run:less', (cb) => {
  runSequence('less', 'browser:reload', () => {
    cb();
  });
});

gulp.task('less', () => {
  return gulp.src(paths.less.src)
    .pipe($.plumber(opts.plumber))
    .pipe($.less())
    .pipe($.rename(paths.less.filename))
    .on('error', opts.plumber.errorHandler)
    .pipe($.autoprefixer(opts.autoprefixer))
    .pipe($.cssmin())
    .pipe(gulp.dest(paths.dest.css)).on('error', gutil.log);
});

////////////////////////
// ESLint
////////////////////////
gulp.task('eslint', () => {
  return gulp.src(paths.eslint.src)
    .pipe($.plumber(opts.plumber))
    .pipe($.eslint())
    .on('error', opts.plumber.errorHandler)
    .pipe($.eslint.format('stylish'))
    .pipe($.notify(opts.notify.eslint));
});

////////////////////////
// Imgmin
////////////////////////
gulp.task('img', () => {
  return gulp.src(paths.img.src)
    .pipe($.imagemin(opts.imagemin))
    .on('error', opts.plumber.errorHandler)
    .pipe(gulp.dest(paths.dest.img));
});