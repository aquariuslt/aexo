/** Created by Aquariuslt on 2016-03-16.*/
'use strict';
var config = require('../config/config');
var logger = config.logger;
var path = require('path');
var gulp = require('gulp');
var webpack = require('webpack-stream');

module.exports = gulp.task('watch', function () {
  logger.info('[task]:watch');
  function reload(event) {
    logger.info('[watch]:' + event.path + ' change.updating..');
  }

  var scriptWatcher = gulp.watch(config.scripts, ['webpack']);
  var stylesWatcher = gulp.watch(config.styles, ['styles']);
  var viewsWatcher = gulp.watch(config.views, ['webpack']);

  scriptWatcher.on('change', reload);
  stylesWatcher.on('change', reload);
  viewsWatcher.on('change', reload);
});