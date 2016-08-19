/** Created by Aquariuslt on 4/3/16.*/

var pageService = require('../services/page-service')();

module.exports = function pageController() {

  var page = this;

  page.service = pageService;

};


