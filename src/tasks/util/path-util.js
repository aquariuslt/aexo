/* Created by Aquariuslt on 2017-03-04.*/
import _ from "lodash";
import glob from "glob";


/**
 * To scan the path array regex patterns
 * @param {*} globPatterns the regex patterns to match multi path
 * @param {*} [excludes] excludes the paths ignore to scan
 * @return {*} the folder path without '*'
 * */
function getGlobalPaths(globPatterns, excludes) {
  const urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');
  let output = [];
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
      let files = glob.sync(globPatterns);
      if (excludes) {
        files = files.map(function (file) {
          if (_.isArray(excludes)) {
            for (let i = 0; i < excludes.length; i++) {
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
 * filePath:'src/data/posts/articles/site-code-structure.md'
 * output:'site-code-structure'
 * */
function getFilePrefix(filePath) {
  const pathArray = filePath.split('/');
  const fileName = pathArray[pathArray.length - 1];
  return fileName.split('.')[0];
}

export {
  getGlobalPaths,
  getFilePrefix
}