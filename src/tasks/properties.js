/* Created by Aquariuslt on 2017-03-19.*/
import gulp from "gulp";
import yaml from "gulp-yaml";
import config from "./config/gulp.config";


gulp.task('properties', function () {
  gulp.src(config.appConfig)
    .pipe(yaml({}))
    .pipe(gulp.dest(config.buildDir));
});
