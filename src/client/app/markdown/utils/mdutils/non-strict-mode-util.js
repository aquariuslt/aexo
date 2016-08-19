/** Created by Jason Cui on 2016-04-24.*/
'use strict';

var angular = require('angular');
//noinspection JSCheckFunctionSignatures
var $injector = angular.injector(['ng']);
var $log = $injector.get('$log');

var _ = require('lodash');

module.exports = function constructNonStrictModeTokens(tokens) {

  var replaceRegex = /\n/ig;
  var replacementRegex = '  \n';

  var nonStrictModeTokens = _.clone(tokens);

  _.forEach(nonStrictModeTokens, function (currentToken) {
    if (_.isEqual(currentToken.type, 'paragraph')) {
      currentToken.text = _.replace(currentToken.text, replaceRegex, replacementRegex);
    }
  });

  nonStrictModeTokens.links = {};
  return nonStrictModeTokens;
};