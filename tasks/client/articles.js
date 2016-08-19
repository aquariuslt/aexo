/** Created by Aquariuslt on 6/28/16.*/
'use strict';

var config = require('../config/config');
var logger = config.logger;

var articleCompileUtil = require('../utils/article-compile-util');

var _ = require('lodash');
var gulp = require('gulp');
var inject = require('gulp-inject-string');
var htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');

module.exports = gulp.task('compile-articles', function () {
  logger.info('[task]:compile-articles');
  var articles = JSON.stringify(articleCompileUtil.loadArticles());

  gulp.src(config.emptyFile)
    .pipe(inject.append(
      'module.exports = ' + articles + ';'
    ))
    .pipe(rename(config.bundle.articles))
    .pipe(gulp.dest(config.dest));

  logger.info('[task]:compile-articles-end');
});