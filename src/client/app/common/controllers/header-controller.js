/** Created by Aquariuslt on 2016-03-19.*/
'use strict';

module.exports = function headerController($scope, $timeout, $mdSidenav, $log) {

  $scope.toggleLeft = buildDelayedToggler('left');

  function debounce(func, wait) {
    var timer;
    return function debounced() {
      var context = $scope,
        args = Array.prototype.slice.call(arguments);
      $timeout.cancel(timer);
      timer = $timeout(function () {
        timer = undefined;
        func.apply(context, args);
      }, wait || 10);
    };
  }

  function buildDelayedToggler(navID) {
    return debounce(function () {
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
    }, 200);
  }
};