/** Created by Aquariuslt on 4-17-2016.*/
'use strict';

var config = require('../config/config');
var logger = config.logger;

var _ = require('lodash');
var moment = require('moment');

var marked = require('marked');
var articleRenderer = require('./article-renderer');

module.exports.parseMarkdownString = parseMarkdownString;

/**
 * Convert markdown String to markdownObject
 * @param {string} fileNamePrefix the fireNamePrefix without '.md'
 * @param {string} mdContent the original string read from file
 * @return {object} the object contains:
 *
 * metadata:
 *  - title
 *  - published
 *  - summary
 *  - link
 *  - tags
 * html:
 * md:
 * */
function parseMarkdownString(fileNamePrefix, mdContent) {
  var htmlContent = marked(mdContent, {
    renderer: articleRenderer
  });
  var metadata = getMetaData(fileNamePrefix, mdContent);

  return {
    link: metadata.link,
    title: metadata.title,
    published: metadata.published,
    tags: metadata.tags,
    //md: mdContent,
    html: htmlContent
  };
}


function getMetaData(fileNamePrefix, mdContent) {
  var lexer = new marked.Lexer();
  var tokens = lexer.lex(mdContent);
  var metadataText = _.find(tokens, {
    type: 'code',
    lang: 'metadata'
  });
  var text = metadataText.text;
  var metadata = JSON.parse(text);

  constructExtraInfo(fileNamePrefix, metadata);
  logger.info('Parsed metadata:', metadata);
  return metadata;
}


function constructExtraInfo(fileNamePrefix, metadata) {
  var published = moment(metadata.date);
  var publishPrefix = published.format('YYYY/MM/DD');

  //noinspection JSUnresolvedFunction
  metadata.published = metadata.date;
  metadata.link = publishPrefix + '/' + fileNamePrefix;
}