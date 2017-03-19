/* Created by Aquariuslt on 2017-03-04.*/
import logger from "./util/logger";
import config from "./config/gulp.config";
import inject from "gulp-inject-string";
import rename from "gulp-rename";
import gulp from "gulp";
import _ from "lodash";

gulp.task('cname', function (next) {
  let cname = config.cname;

  if (!_.isUndefined(cname)) {
    logger.info('Generating CNAME file:', cname);
    gulp.src(config.emptyFile)
      .pipe(inject.append(cname))
      .pipe(rename('CNAME'))
      .pipe(gulp.dest(config.buildDir))
      .on('end', function () {
        if (next) {
          next();
        }
      });
  }
  else {
    next();
  }
});