/** Created by Aquariuslt on 6/28/16.*/

var config = require('../config/config');
var logger = config.logger;

var gulp = require('gulp');
var rename = require('gulp-rename');

module.exports = gulp.task('export-variables', function () {
  logger.info('[task]:export-variables');

  gulp.src(config.siteConfig)
    .pipe(rename(config.bundle.siteConfig))
    .pipe(gulp.dest(config.dest));

  logger.info('[task]:export-variables-end');
});