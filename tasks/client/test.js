/** Created by Aquariuslt on 2016-03-16.*/
'use strict';

var config = require('../config/config');
var logger = config.logger;
var runSequence = require('run-sequence');

var gulp = require('gulp');

var clean = require('./clean');
var index = require('./index');
var styles = require('./styles');
var webpack = require('./webpack');
var watch = require('./webpack-watch');
var minify = require('./minify');
var articles = require('./articles');
var variables = require('./variables');


gulp.task('env:test', function () {
  logger.info('[task]:client');
  if (process.env.NODE_ENV === 'release') {
    runSequence(
      ['clean'],
      ['compile-articles', 'export-variables'],
      ['index', 'styles'],
      ['webpack'],
      'minify'
    );
  }
  else {
    runSequence(
      ['clean'],
      ['compile-articles', 'export-variables'],
      ['index', 'styles'],
      ['webpack']
    );
  }
  logger.info('[task]:end');
});