/** Created by Aquariuslt on 2016-03-19.*/
'use strict';
var angular = require('angular');
var $injector = angular.injector(['ng'], false);
var $log = $injector.get('$log');

module.exports = function ($stateProvider) {
  $stateProvider
    .state('editor', {
      url: '/markdown-editor',
      templateUrl: 'app/markdown/views/markdown-editor.html'
    })
};