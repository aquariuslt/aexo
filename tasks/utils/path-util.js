/** Created by Aquariuslt on 4-16-2016.*/
'use strict';

var _ = require('lodash');
var glob = require('glob');


module.exports.getGlobalPaths = getGlobalPaths;
module.exports.getFilePrefix = getFilePrefix;

/**
 * To scan the path array regex patterns
 * @param {*} globPatterns the regex patterns to match multi path
 * @param {*} [excludes] excludes the paths ignore to scan
 * @return {*} the folder path without '*'
 * */
function getGlobalPaths(globPatterns, excludes) {
  var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');
  var output = [];
  if (_.isArray(globPatterns)) {

    globPatterns.forEach(function (globPattern) {
      output = _.union(output, getGlobalPaths(globPattern, excludes));
    });
  }
  else if (_.isString(globPatterns)) {
    if (urlRegex.test(globPatterns)) {
      output.push(globPatterns);
    }
    else {
      var files = glob.sync(globPatterns);
      if (excludes) {
        files = files.map(function (file) {
          if (_.isArray(excludes)) {
            for (var i = 0; i < excludes.length; i++) {
              file = file.replace(excludes[i], '');
            }
          }
          else {
            file = file.replace(excludes, '');
          }
          return file;
        });
      }
      output = _.union(output, files);
    }
  }

  return output;
}

/**
 * @param {string} filePath the full path for file
 * @return {string} filename prefix
 * @example
 * filePath:'src/server/posts/articles/site-code-structure.md'
 * output:'site-code-structure'
 * */
function getFilePrefix(filePath) {
  var pathArray = filePath.split('/');
  var fileName = pathArray[pathArray.length - 1];
  return fileName.split('.')[0];
}