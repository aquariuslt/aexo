/** Created by Aquariuslt on 8/19/16 */


/**
 * Async delete dest folder files.
 * Should be done before new packaging.
 * */
var config = require('../config/config');
var logger = config.logger;

var gulp = require('gulp');
var clean = require('gulp-clean');


gulp.task('clean',function(){
  logger.info('[task]:clean');
  gulp.src(config.dest,{}).pipe(clean());
  logger.info('[task]:client end.')
});