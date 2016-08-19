/** Created by Jason Cui on 3/26/16.*/
'use strict';

module.exports = function summaryFilter() {
  return function (content, summaryLength) {
    if (summaryLength) {
      return content.substring(0, summaryLength);
    }
    else {
      return content.substring(0, 80);
    }
  }
};