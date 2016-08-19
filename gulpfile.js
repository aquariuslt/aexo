/**Created by CUIJA on 2016-06-29.*/

var runSequence = require('run-sequence');
var gulp = require('gulp');

var clean = require('./tasks/client/clean');
var client = require('./tasks/client/client');
var test = require('./tasks/client/test');
var deploy = require('./tasks/client/deploy');

gulp.task('default', function () {
  runSequence('client');
});

gulp.task('deploy', function () {
  runSequence('gh-pages');
});

gulp.task('test', function () {
  runSequence('env:test');
});



/**Gulp test alias*/
gulp.task('c',['clean']);
gulp.task('s',['default']);
gulp.task('t',['test']);
gulp.task('d',['deploy']);