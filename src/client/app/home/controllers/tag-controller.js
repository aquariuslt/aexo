/** Created by Aquariuslt on 4/3/16 */

var pageService = require('../../common/services/page-service')();
var articleService = require('../services/article-service')();

module.exports = function tagController($stateParams, $interval) {
  var vm = this;

  vm.tagLinkPrefix = '#!/tag/';
  vm.tagName = $stateParams.tagName;
  vm.indeterminateValue = 0;
  vm.showProgressBar = false;
  vm.tagDetailList = [];

  init();

  function init() {
    initTitle();
    loadTagDetail();
  }

  function initTitle() {
    pageService.setTitle('Tags Contains ' + vm.tagName);
  }

  function loadTagDetail() {
    startInterval();
    articleService.loadArticleSummaryList(function (error, summaryList) {
      vm.tagDetailList = articleService.filterArticleListByTagName(summaryList, vm.tagName);
      stopInterval();
    });
  }

  function updateProgressBar() {
    if (vm.showProgressBar) {
      vm.indeterminateValue += 1;
      if (vm.indeterminateValue > 100) {
        vm.indeterminateValue = 0;
      }
    }
  }

  function startInterval() {
    vm.showProgressBar = true;
    $interval(updateProgressBar, 100, 0, true);
  }

  function stopInterval() {
    vm.showProgressBar = false;
    $interval.cancel(updateProgressBar);
  }

};