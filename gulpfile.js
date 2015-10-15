'use strict';
let gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserSync = require('browser-sync').create(),
    $ = require('gulp-load-plugins')(),
    paths = require('./routes/lib/gulp.config').paths,
    opts = require('./routes/lib/gulp.config').opts;

gulp.task('default', ['less:watch', 'eslint:watch', 'browserSync']);

gulp.task('browserSync', function() {
    browserSync.init(opts.browserSync);
    gulp.watch(paths.bundle.src).on('change', function() {
      browserSync.reload();
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

gulp.task('less:watch', function() {
  gulp.watch(paths.less.watch, ['less:reload']);
});

gulp.task('less:reload', ['less'], function() {
    browserSync.reload();
});

gulp.task('eslint', function() {
  return gulp.src(paths.eslint.src)
    .pipe($.plumber(opts.plumber))
    .pipe($.eslint())
    .on('error', opts.plumber.errorHandler)
    .pipe($.eslint.format('stylish'))
    .pipe($.notify(opts.notify.eslint));
});

gulp.task('eslint:watch', function() {
  gulp.watch(paths.eslint.src, ['eslint']);
});

gulp.task('img', function() {
  return gulp.src(paths.img.src)
  .pipe($.imagemin(opts.imagemin))
  .on('error', opts.plumber.errorHandler)
  .pipe(gulp.dest(paths.dest.img));
});