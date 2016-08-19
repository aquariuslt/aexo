/** Created by Aquariuslt on 2016-03-19.*/
'use strict';

var angular = require('angular');
//noinspection JSUnusedLocalSymbols
var uiRouter = require('angular-ui-router');

module.exports = ['$locationProvider', function ($locationProvider) {
  $locationProvider.hashPrefix('!');
  $locationProvider.html5Mode(false);
}];