/** Created by Aquariuslt on 2016-03-16.*/
'use strict';
var config = require('../config/config');
var logger = config.logger;
var gulp = require('gulp');
var replace = require('gulp-replace');
var htmlmin = require('gulp-htmlmin');

/**
 * @description as a single-page-application,
 * we locate entry html 'index.html' and move
 * it to dest folder:
 * 1.locate 'index.html'
 * 2.replace scripts and styles tag
 * 3.move to 'dest' folder
 * */
module.exports = gulp.task('index', function () {
  logger.info('[task]:index');
  gulp.src(config.index).pipe(replace('<!-- CSS -->', '<link href="' + config.bundle.style + '" rel="stylesheet">')).pipe(replace('<!-- JS -->', '<script src="' + config.bundle.script + '"></script>')).pipe(htmlmin(config.htmlminOptions)).pipe(gulp.dest(config.dest));
  logger.info('[task]:index-end');
});