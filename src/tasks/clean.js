/* Created by Aquariuslt on 2017-03-04.*/
import gulp from "gulp";
import rimraf from "gulp-rimraf";
import logger from "./util/logger";
import config from "./config/gulp.config";

gulp.task('clean-cache', function () {
  logger.info('Deleting cache folder');
  return gulp.src(config.cacheDir)
    .pipe(rimraf());
});

gulp.task('clean', ['clean-cache'], function () {
  logger.info('Deleting dist folder');
  return gulp.src(config.buildDir)
    .pipe(rimraf());
});
