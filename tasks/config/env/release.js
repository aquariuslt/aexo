/** Created by Aquariuslt on 2016-03-15.*/
'use strict';

var winston = require('winston');
var webpack = require('webpack');
var logger = new winston.Logger({
  level: 'info',
  transports: [
    new (winston.transports.Console)({
      timestamp: Date.now()
    })
  ]
});
var htmlminOptions = {
  comments: true,
  empty: true,
  spare: true,
  quotes: true
};

var cleanCssOptions = {};

//noinspection JSUnresolvedFunction
var webpackOptions = {};

var bundledFileName = {
  script: 'bundle.min.js',
  style: 'bundle.min.css',
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