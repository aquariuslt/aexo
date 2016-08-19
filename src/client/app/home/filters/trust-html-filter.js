/** Created by Aquariuslt on 4/4/16.*/


module.exports = function trustHtmlFilter($sce) {
  return function (originalHtmlString) {
    return $sce.trustAsHtml(originalHtmlString);
  }
};