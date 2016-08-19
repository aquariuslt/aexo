/** Created by Aquariuslt on 08-15-2016.*/
/** CNAME files generation for github page auto forwarding to CNAME */

var config = require('../config/config');
var logger = config.logger;
var siteConfig = require('../config/siteConfig');

var gulp = require('gulp');
var inject = require('gulp-inject-string');
var rename = require('gulp-rename');
var _ = require('lodash');

gulp.task('cname', function (next) {
  var cname = siteConfig.cname;
  if (!_.isUndefined(cname)) {
    logger.info('[task]:cname:', cname);
    gulp.src(config.emptyFile)
      .pipe(inject.append(
        cname
      ))
      .pipe(rename('CNAME'))
      .pipe(gulp.dest(config.dest))
      .on('end',function(){
        if (next) {
          logger.info('[task]:cname-end');
          next();
        }
      });
  }
  else {
    next();
  }
});

