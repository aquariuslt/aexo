/** Created by Aquariuslt on 4-16-2016.*/
'use strict';

var config = require('../config/config');
var logger = config.logger;
var _ = require('lodash');


module.exports.handleError = handleError;


function handleError(error) {
  if (!_.isEmpty(error)) {
    logger.error(error);
  }
}