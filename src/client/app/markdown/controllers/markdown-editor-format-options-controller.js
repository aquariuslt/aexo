/** Created by Aquariuslt on 4-22-2016.*/

var _ = require('lodash');

module.exports = function markdownEditorFormatOptionsController($log, $mdDialog, $cookies) {

  var vm = this;

  vm.formatOptions = [
    {
      name: 'Hexo Header',
      value: 'hexoHeader'
    },
    {
      name: 'Non-Strict Mode',
      value: 'nonStrictMode'
    },
    {
      name: 'TOC',
      value: 'toc'
    }
  ];
  vm.selectedOptions = getOptions();

  vm.exists = exists;
  vm.toggle = toggle;

  vm.cancel = cancel;
  vm.saveOptions = saveOptions;

  function cancel() {
    $log.info('click cancel');
    $mdDialog.cancel();
  }

  function getOptions() {
    var formatOptionsFromCookies = $cookies.get('formatOptions');
    if (!_.isEmpty(formatOptionsFromCookies)) {
      $log.info('cookies:', JSON.parse(formatOptionsFromCookies));
      return JSON.parse(formatOptionsFromCookies);
    }
    else {
      $log.info('set empty selectedOptions');
      return [];
    }
  }

  function saveOptions() {
    $cookies.put('formatOptions', JSON.stringify(vm.selectedOptions));
    $log.info('click save:', JSON.stringify(vm.selectedOptions));
    $mdDialog.hide();
  }

  function exists(item, list) {
    return _.indexOf(list, item.value) > -1;
  }

  function toggle(item, list) {
    var index = _.indexOf(list, item.value);
    $log.info('toggle index:', index);
    $log.info(list);
    if (index > -1) {
      list.splice(index, 1);
    }
    else {
      list.push(item.value);
    }
  }

};
