/** Created by Aquariuslt on 2016-03-16.*/
'use strict';
var config = require('../config/config');
var logger = config.logger;
var path = require('path');
var _ = require('lodash');
var gulp = require('gulp');
var webpack = require('webpack');
var templates = require('./templates');


var webpackOptions = {
  entry: ('./' + config.entry),
  output: {
    path: config.dest,
    filename: config.bundle.script
  }
};

var mergedWebpackOptions = _.merge(webpackOptions, config.webpackOptions);

module.exports = gulp.task('webpack', ['templates'], function (callback) {
  logger.info('[task]:webpack');
  webpack(mergedWebpackOptions, function (error, status) {
    if (error) {
      logger.error('webpack error:', error);
    }
    logger.info('[webpack]:', status.toString({}));
    logger.info('[task]:webpack-end');
    callback();
  });
});