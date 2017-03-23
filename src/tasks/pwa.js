/* Created by Aquariuslt on 2017-03-23.*/
import gulp from "gulp";
import rename from "gulp-rename";
import inject from "gulp-inject-string";
import config from "./config/gulp.config";
import "./clean";
import * as fs from "fs";

const MANIFEST_WEBAPP = 'manifest.webapp';

gulp.task('pwa', function (next) {
  let applicationPropertiesPath = config.buildDir + '/' + config.output.application;
  let applicationPropertiesString = fs.readFileSync(applicationPropertiesPath).toString();
  let applicationProperties = JSON.parse(applicationPropertiesString);

  let baseManifest = JSON.parse(fs.readFileSync(config.manifest).toString());

  let pwaOptions = applicationProperties.blog.pwa;

  if (pwaOptions.enable) {
    baseManifest.name = pwaOptions.name;
    baseManifest.short_name = pwaOptions.shortName;
    baseManifest.description = pwaOptions.description;
    baseManifest.developer = {
      name: pwaOptions.developer.name,
      url: pwaOptions.developer.url
    };

    gulp.src(config.emptyFile)
      .pipe(inject.append(JSON.stringify(baseManifest)))
      .pipe(rename(MANIFEST_WEBAPP))
      .pipe(gulp.dest(config.buildDir))
      .on('end', function () {
        if (next) {
          next();
        }
      })
  }
  else if (next) {
    next();
  }

});
