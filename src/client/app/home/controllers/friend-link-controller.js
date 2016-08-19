/** Created by Aquariuslt on 4/18/16.*/


var siteVariables = require('../../../../../dest/siteConfig');
var pageService = require('../../common/services/page-service')();

module.exports = function friendLinkController($location) {
  var vm = this;

  vm.pageTitle = 'Friend Links';

  vm.contentText = '需要添加友情链接的童鞋\n'
                   + '现在自己网站添加本站链接,谢谢~\n'
                   + '然后在下方disqus评论框添加网站信息.\n'
                   + '要求:\n'
                   + '名称:\n'
                   + '链接:\n'
                   + '描述:\n';

  vm.friendLinkList = siteVariables.friendLinks;

  vm.disqusShortLink = 'friend-link';
  vm.disqusUrl = $location.absUrl();
  vm.disqusConfig = {
    disqus_shortname: siteVariables.disqusShortName,
    disqus_identifier: vm.disqusShortLink,
    disqus_url: vm.disqusUrl
  };

  init();

  function init() {
    initTitle();
  }

  function initTitle() {
    pageService.setTitle('Friend Links');
  }
};