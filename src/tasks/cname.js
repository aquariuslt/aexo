/* Created by Aquariuslt on 2017-03-04.*/
import logger from "./util/logger";
import config from "./config/gulp.config";
import inject from "gulp-inject-string";
import rename from "gulp-rename";
import gulp from "gulp";
import _ from "lodash";
import * as fs from "fs";

gulp.task('cname', function (next) {
  logger.info('Generate CNAME file:');

  let applicationPropertiesPath = config.buildDir + '/' + config.output.application;
  let applicationPropertiesString = fs.readFileSync(applicationPropertiesPath).toString();
  let applicationProperties = JSON.parse(applicationPropertiesString);


  let cname = applicationProperties.cname;

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
