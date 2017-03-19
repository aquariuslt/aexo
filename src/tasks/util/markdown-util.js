/* Created by Aquariuslt on 2017-03-04.*/
import * as fs from "fs";
import marked from "marked";
import _ from "lodash";
import moment from "moment";
import logger from "./logger";
import * as pathUtil from "./path-util";

function readMarkdownSource(sourceUrl) {
  return fs.readFileSync(sourceUrl).toString();
}

function parseMarkdown(sourceUrl) {
  let mdString = readMarkdownSource(sourceUrl);
  let fileNamePrefix = parseFileNamePrefix(sourceUrl);
  let metadata = parseMarkdownMetaData(mdString, fileNamePrefix);
  let mdTokens = parseMarkdownTokens(mdString);
  return constructMarkdown(metadata, mdTokens);
}

function parseMarkdownMetaData(markdownString, fileNamePrefix) {
  let mdString = _.clone(markdownString);
  let lexer = new marked.Lexer();
  let tokens = lexer.lex(mdString);
  let metadataToken = _.find(tokens, {
    type: 'code',
    lang: 'metadata'
  });
  if (_.isUndefined(metadataToken)) {
    logger.error('Could not found metadata, please check have metadata correct in .md files.');
    return;
  }

  let metadata = JSON.parse(metadataToken.text);

  let parsedMetadata = _.clone(metadata);


  let baseDate = null;
  if (!_.isUndefined(metadata.created)) {
    baseDate = moment(new Date(metadata.created));

    parsedMetadata.created = baseDate.format('YYYY-MM-DD');
    if (metadata.updated) {
      let updated = moment(new Date(metadata.updated));
      parsedMetadata.updated = updated.format('YYYY-MM-DD');
    }
    else {
      parsedMetadata.updated = baseDate.format('YYYY-MM-DD');
    }
  }
  else {
    baseDate = moment(new Date(metadata.date));
    parsedMetadata.created = baseDate.format('YYYY-MM-DD');
    parsedMetadata.updated = baseDate.format('YYYY-MM-DD');
  }

  let linkPrefix = baseDate.format('YYYY/MM/DD');
  parsedMetadata.link = linkPrefix + '/' + fileNamePrefix;
  if (!_.isUndefined(metadata.category)) {
    parsedMetadata.category = metadata.category
  }

  return parsedMetadata;
}

function parseFileNamePrefix(sourceUrl) {
  return pathUtil.getFilePrefix(sourceUrl);
}

function parseMarkdownTokens(markdownString) {
  let mdString = _.clone(markdownString);
  const ignoreLanguageList = [
    {
      type: 'code',
      lang: 'metadata'
    }
  ];

  let lexer = new marked.Lexer();
  let tokens = lexer.lex(mdString);

  let filteredTokens = [];
  _.each(tokens, function (token) {
    let filterFlag = false;
    _.each(ignoreLanguageList, function (ignoreLanguage) {
      if (_.isEqual(ignoreLanguage.type, token.type)) {
        if (!_.isUndefined(token.lang) && _.isEqual(token.lang, ignoreLanguage.lang)) {
          filterFlag = true;
        }
      }
    });
    if (!filterFlag) {
      filteredTokens.push(token);
    }
  });


  return filteredTokens;
}


function constructMarkdown(metadata, mdTokens) {
  return {
    title: metadata.title,
    link: metadata.link,
    created: metadata.created,
    updated: metadata.updated,
    tags: metadata.tags,
    category: metadata.category,
    metadata: metadata,
    tokens: mdTokens
  };
}


export {
  parseMarkdown
}