/** Created by Aquariuslt on 2016-03-19.*/
'use strict';

var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var header = require('gulp-header');
var htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');
var config = require('../config/config');
var logger = config.logger;


module.exports = gulp.task('templates', function (callback) {
  logger.info('[task]:templates');
  gulp.src(config.views)
    .pipe(htmlmin(config.htmlminOptions))
    .pipe(templateCache({root: config.app, standalone: true}))
    .pipe(header('module.exports = '))
    .pipe(rename(config.bundle.templates))
    .pipe(gulp.dest(config.dest))
    .on('end', function () {
      if (callback) {
        logger.info('[task]:templates-end');
        callback();
      }
    });

});