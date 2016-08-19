/** Created by Aquariuslt on 2016-03-29.*/
'use strict';

var config = require('../config/config');
var logger = config.logger;
var gulp = require('gulp');
var minify = require('gulp-uglify');


module.exports = gulp.task('minify', function () {
  logger.info('[task]:minify');
  gulp.src(config.dest + '/' + config.bundle.script)
    .pipe(minify({mangle: false}))
    .pipe(gulp.dest(config.dest));
  logger.info('[task]:minify-end');
});