/** Created by Jason Cui on 3/26/16.*/

/**
 * Utils for handle angular front-end error.
 * */
'use strict';
var _ = require('lodash');
var angular = require('angular');
//noinspection JSCheckFunctionSignatures
var $injector = angular.injector(['ng']);
var $log = $injector.get('$log');

module.exports.handleError = handleError;

function handleError(error) {
  if (!_.isEmpty(error)) {
    $log.error(error);
  }
}