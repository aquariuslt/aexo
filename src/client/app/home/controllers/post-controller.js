/** Created by Aquariuslt on 4/4/16.*/
var _ = require('lodash');

var siteVariables = require('../../../../../dest/siteConfig');
var errorUtil = require('../../common/utils/error-util');

var pageService = require('../../common/services/page-service')();
var articleService = require('../services/article-service')();

module.exports = function postController($location, $log, $stateParams, $state) {
  var vm = this;
  vm.tagLinkPrefix = '#!/tag/';
  vm.postLink = $stateParams.postLink;
  vm.postDetail = {};
  vm.showProgressBar = false;
  vm.postContent = {};

  vm.disqusShortLink = $stateParams.postLink.replace(/\//g, '-');
  vm.disqusUrl = $location.absUrl();
  vm.disqusConfig = {
    disqus_shortname: siteVariables.disqusShortName,
    disqus_identifier: vm.disqusShortLink,
    disqus_url: vm.disqusUrl
  };

  init();

  function init() {
    initTitle();
    loadPostDetail();
  }

  function initTitle() {
    pageService.setTitle('Post');
  }

  function loadPostDetail() {
    showProgressBar();
    articleService.loadPostDetail(vm.postLink, function (error, postDetail) {
      errorUtil.handleError(error);
      //$log.info('postDetail:',postDetail);
      if (_.isUndefined(postDetail)) {
        hideProgressBar();
        $state.go('otherwise');
      }
      else {
        vm.postDetail = postDetail;
        pageService.setTitle(postDetail.title);
        hideProgressBar();
      }
    });
  }

  function showProgressBar() {
    vm.showProgressBar = true;
  }

  function hideProgressBar() {
    vm.showProgressBar = false;
  }

};
