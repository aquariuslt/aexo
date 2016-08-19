/** Created by Aquariuslt on 4/24/16.*/
var angular = require('angular');
//noinspection JSCheckFunctionSignatures
var $injector = angular.injector(['ng']);
var $log = $injector.get('$log');

module.exports = function (localStorageServiceProvider) {
  localStorageServiceProvider.setPrefix('site');
};