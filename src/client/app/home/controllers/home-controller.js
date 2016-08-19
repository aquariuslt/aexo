/** Created by Aquariuslt on 2016-03-25.*/
'use strict';
var articleService = require('../services/article-service')();
var pageService = require('../../common/services/page-service')();

module.exports = function homeController($log, $interval) {
  var vm = this;

  vm.articleSummaryList = [];
  vm.tagLinkPrefix = '#!/tag/';
  vm.indeterminateValue = 0;
  vm.showProgressBar = false;
  init();

  function init() {
    initTitle();
    loadArticleSummaryList();
  }

  function initTitle() {
    pageService.setTitle('');
  }

  function loadArticleSummaryList() {
    startInterval();
    articleService.loadArticleSummaryList(function (error, summaryList) {
      vm.articleSummaryList = summaryList;
      $log.info('load articleSummaryList complete. count of articleSummary:',
                vm.articleSummaryList.length);
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