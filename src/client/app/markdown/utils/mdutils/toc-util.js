/** Created by Aquariuslt on 4/24/16.*/
'use strict';
var angular = require('angular');
//noinspection JSCheckFunctionSignatures
var $injector = angular.injector(['ng'], false);
var $log = $injector.get('$log');
var _ = require('lodash');

module.exports = function constructTocTokens(tokens) {

  //Construct Toc Html Blocks
  var tagStart = '<pre>';
  var tagEnd = '</pre>';
  _.forEach(tokens, function (currentToken) {
    if (_.isEqual(currentToken.type, 'heading')) {
      var depth = currentToken.depth;
      var treeNodePrefix = '';
      for (var i = 0; i < depth - 1; i++) {
        treeNodePrefix += '&nbsp;&nbsp;';
      }
      var currentLocationUrl = window.location.href;
      tagStart +=
        (treeNodePrefix + '<a href="' + currentLocationUrl + '#' + tocLinkCase(currentToken.text)
         + '">' + currentToken.text + '</a>\n');
    }

  });
  var tocBlockHtml = tagStart + tagEnd;

  //Replace [TOC] as html block
  _.forEach(tokens, function (currentToken) {
    if (_.isEqual(currentToken.type, 'paragraph') && _.isEqual(currentToken.text, '[TOC]')) {
      currentToken.type = 'html';
      delete currentToken.lang;
      currentToken.text = tocBlockHtml;
    }
  });

  tokens.link = {};
  return tokens;

};

function tocLinkCase(text) {
  var spaceRegex = / /ig;
  var spaceReplacement = '-';
  var lowerText = _.toLower(text);
  return _.replace(lowerText, spaceRegex, spaceReplacement);
}