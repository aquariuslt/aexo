/** Created by Aquariuslt on 2016-03-14.*/
'use strict';
var _ = require('lodash');
var winston = require('winston');

var config = {
  src: 'src',
  dest: 'dest',
  index: 'src/client/index.html',
  scripts: 'src/client/**/**/*.js',
  styles: 'src/client/styles/*.css',
  app: 'app',
  views: 'src/client/app/**/views/*.html',
  entry: 'src/client/app/boot.js',
  port: 8080,
  articles: 'src/articles/*.md',
  emptyFile: 'tasks/client/empty.js',
  siteConfig: 'tasks/config/siteConfig.js'
};

module.exports = initEnvironmentConfig();

function initEnvironmentConfig() {
  //noinspection JSUnresolvedVariable
  var environment = process.env.NODE_ENV || 'development';
  var environmentConfig = {};
  if (_.isEqual(environment, 'release')) {
    environmentConfig = require('./env/release');
  }
  else {
    environmentConfig = require('./env/development');
  }
  return _.extend(config, environmentConfig);
}