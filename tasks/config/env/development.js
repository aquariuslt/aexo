/** Created by Aquariuslt on 2016-03-15.*/
'use strict';

var winston = require('winston');
var logger = new winston.Logger({
  level: 'debug',
  transports: [
    new (winston.transports.Console)({
      timestamp: Date.now()
    })
  ]
});
var htmlminOptions = {
  comments: false,
  empty: true,
  spare: true,
  quotes: true
};

var cleanCssOptions = {
  debug: true
};

var webpackOptions = {};

var bundledFileName = {
  script: 'bundle.js',
  style: 'bundle.css',
  templates: 'templates.js',
  articles: 'articles.js',
  siteConfig: 'siteConfig.js'
};

module.exports = {
  logger: logger,
  bundle: bundledFileName,
  htmlminOptions: htmlminOptions,
  cleanCssOptions: cleanCssOptions,
  webpackOptions: webpackOptions
};