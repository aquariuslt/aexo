/** Created by Aquariuslt on 4-23-2016.*/

/**
 * Lexer Options for Hexo Header
 *
 * */
var angular = require('angular');
//noinspection JSCheckFunctionSignatures
var $injector = angular.injector(['ng']);
var $log = $injector.get('$log');

var _ = require('lodash');

module.exports = function constructHexoTokens(tokens) {
  //$log.info('using hexo header for construct tokens');

  //for Hexo Parser,we regards the first '---' as hr
  //before <hr> all are Hexo metadata
  var hexoMetadataIndex = _.findIndex(tokens, {
    type: 'hr'
  });

  var hexoMetadataTokens = tokens.slice(0, hexoMetadataIndex + 1);

  //combine tags
  var hexoTags = [];
  var hexoTagStartIndex = _.findIndex(hexoMetadataTokens, {type: 'list_start'});
  var hexoTagEngIndex = _.findIndex(hexoMetadataTokens, {type: 'list_end'});
  for (var tagIndex = hexoTagStartIndex + 1; tagIndex < hexoTagEngIndex; tagIndex++) {
    if (_.isEqual(hexoMetadataTokens[tagIndex].type, 'text')) {
      hexoTags.push(hexoMetadataTokens[tagIndex].text);
    }
  }

  //combine all headers
  var hexoHeaderString = '';
  for (var headerIndex = 0; headerIndex < hexoMetadataIndex; headerIndex++) {
    if (_.isEqual(hexoMetadataTokens[headerIndex].type, 'paragraph')) {
      hexoHeaderString += hexoMetadataTokens[headerIndex].text;
    }
  }

  var headerKeyValueList = hexoHeaderString.split('\n');

  //construct final hexo header
  var hexoHeader = {};
  for (var i = 0, headerLength = headerKeyValueList.length; i < headerLength; i++) {
    var kvp = headerKeyValueList[i].split(':');
    var key = _.trim(kvp[0]);
    var value = '';
    if (kvp.length > 1) {
      value = _.trim(headerKeyValueList[i].substring(key.length + 1));
    }
    if (_.isEqual(key, 'tags')) {
      hexoHeader.tags = hexoTags;
    }
    else {
      hexoHeader[key] = value;
    }
  }

  var headerTokens = {
    type: 'code',
    lang: 'json',
    text: JSON.stringify(hexoHeader, null, 2)
  };

  var contentTokens = tokens.slice(hexoMetadataIndex + 1);

  var combinedTokens = [headerTokens].concat(contentTokens);
  combinedTokens.links = {};

  return combinedTokens;
};

