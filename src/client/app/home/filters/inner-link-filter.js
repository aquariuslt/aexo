/** Created by Aquariuslt on 4/4/16.*/


module.exports = function innerLinkFilter() {
  return function (externalLink) {
    var innerLinkPrefix = '#!/post/';
    return innerLinkPrefix + externalLink;
  }
};