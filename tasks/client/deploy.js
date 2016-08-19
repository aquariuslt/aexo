/** Created by Aquariuslt on 08-15-2016.*/
'use strict';

var config = require('../config/config');
var logger = config.logger;
var siteConfig = require('../config/siteConfig');

var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var runSequence = require('run-sequence');


var cname = require('./cname');

gulp.task('upload', ['cname'],function () {
  var deployOptions = siteConfig.deployOptions;
  logger.info('[task]:push:', deployOptions.remoteUrl);
  gulp.src(config.dest + '/**/*')
    .pipe(ghPages(deployOptions));
  logger.info('[task]:push-end');
});


gulp.task('gh-pages', function () {
  runSequence(
    ['compile-articles', 'export-variables'],
    ['index', 'styles'],
    ['webpack'],
    ['minify'],
    ['upload']
  );
});