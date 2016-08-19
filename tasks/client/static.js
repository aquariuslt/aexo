/** Created by Aquariuslt on 2016-03-16.*/
'use strict';
var config = require('../config/config');
var logger = config.logger;
var gulp = require('gulp');
var express = require('express');
var path = require('path');

module.exports = gulp.task('stat', function (callback) {
  logger.info('[task]:static');
  start();
  if (callback) {
    callback();
  }
});


function start(callback) {
  init(function (app) {
    app.listen(config.port, function (error) {
      if (error) {
        logger.error(error);
      }
      if (callback) {
        callback(app);
      }
    });
  });
}

function init(callback) {
  var app = initExpress();
  if (callback) {
    callback(app);
  }
}

function initExpress() {
  var app = express();
  initClientRoutes(app);
  initMiddleware(app);
  return app;
}

function initClientRoutes(app) {
  app.use('/', express.static(path.resolve('./' + config.dest)));
}

function initMiddleware(app) {
  app.set('showStackError', true);
}
