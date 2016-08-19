/** Created by Aquariuslt on 4-16-2016.*/

/**
 * 1.Load all md files.
 * 2.Compile to JsonObject and save as global value (Array|Map)
 * 3.Implement Memory-Database interface (in another utils like dbHelper,service)
 *
 * */
var fs = require('fs');

var config = require('../config/config');
var logger = config.logger;
var pathUtil = require('./path-util');

var articleParser = require('./article-parser');


module.exports.loadArticles = loadArticles;


function loadArticles() {
  logger.info('Loading Articles');
  var articlePath = pathUtil.getGlobalPaths(config.articles);
  var articles = [];
  articlePath.forEach(function (mdFilePath) {
    logger.info('Loading Article:', mdFilePath);
    var article = loadArticle(mdFilePath);
    articles.push(article);
  });
  return articles;
}


/**
 * 1.Read md file as String
 * 2.Convert to markdown object using custom marked parser and renderer
 * 3.Saving to database
 * */
function loadArticle(mdFilePath) {
  var fileNamePrefix = pathUtil.getFilePrefix(mdFilePath);
  var mdContent = fs.readFileSync(mdFilePath).toString();
  return articleParser.parseMarkdownString(fileNamePrefix, mdContent);
}
