/** Created by Aquariuslt on 2016-03-19.*/
'use strict';

var siteVariables = require('../../../../../dest/siteConfig');

module.exports = function navbarController($state, $log) {

  var vm = this;

  vm.goState = goState;

  vm.isFabMenuOpen = false;
  vm.toggleFabMenuOpen = function () {
    vm.isFabMenuOpen = !vm.isFabMenuOpen;
    $log.info('isFabMenuOpen:', vm.isFabMenuOpen);
  };

  vm.isSubSiteMenuOpen = false;
  vm.toggleSubSiteMenuOpen = toggleSubSiteMenuOpen;

  vm.isFriendLinkMenuOpen = false;
  vm.toggleFriendLinkMenuOpen = toggleFriendLinkMenuOpen;

  vm.isFeatureListOpen = false;
  vm.toggleFeatureListOpen = toggleFeatureListOpen;

  function toggleSubSiteMenuOpen() {
    vm.isSubSiteMenuOpen = !vm.isSubSiteMenuOpen;
    $log.info('isSubSiteMenuOpen:', vm.isSubSiteMenuOpen);
  }

  function toggleFriendLinkMenuOpen() {
    vm.isFriendLinkMenuOpen = !vm.isFriendLinkMenuOpen;
  }

  function toggleFeatureListOpen() {
    vm.isFeatureListOpen = !vm.isFeatureListOpen;
  }

  vm.subSiteList = siteVariables.subSiteLinks;

  vm.featureList = [
    {
      name: 'Markdown Editor',
      link: '#!/markdown-editor',
      state: 'markdown',
      description: 'Markdown Editor with simple features'
    }
  ];

  vm.friendLinkRegisterLink = '#!/friend-links';
  vm.friendLinkList = siteVariables.friendLinks;

  vm.profileLinks = siteVariables.profileLinks;

  function goState(stateName) {
    $log.info('go state:', stateName);
    $state.go(stateName, {});
  }

};