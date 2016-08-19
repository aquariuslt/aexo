/** Created by Aquariuslt on 4-17-2016.*/
/**
 * Using custom render
 * 1.Parse md file with custom metadata header
 * 2.Render md ignore custom metadata field
 *
 * */

'use strict';


var _ = require('lodash');

var marked = require('marked');
var articleRenderer = new marked.Renderer();

var ignoreLanguageList = [
  'metadata'
];


//ignore custom language
articleRenderer.code = function (code, lang, escaped) {
  if (!_.isEmpty(lang) && _.indexOf(ignoreLanguageList, lang) >= 0) {
    return '';
  }
  else {
    return new marked.Renderer().code(code, lang, escaped);
  }
};


module.exports = articleRenderer;
