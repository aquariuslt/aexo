/** Created by Aquariuslt on 2016-03-27.*/
/**
 * Sort summaryList by publish date
 * */

'use strict';
var _ = require('lodash');

module.exports = function publishFilter() {
  return function (summary) {
    //noinspection JSUnresolvedVariable
    if (_.isEqual(summary.published, summary.updated)) {
      return 'Published';
    }
    return 'Published';
  }
};