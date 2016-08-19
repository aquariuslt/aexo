/** Created by Jason Cui on 3/26/16.*/
'use strict';
var _ = require('lodash');

module.exports = function oddFilter() {
  return function (itemList, oddFlag) {
    var filteredItemList = [];
    _.each(itemList, function (item, index) {
      if (_.isEqual((index % 2 === 0), oddFlag)) {
        filteredItemList.push(item);
      }
    });
    return filteredItemList;
  }
};