/* Created by Aquariuslt on 2017-03-04.*/
import gulp from "gulp";
import rename from "gulp-rename";
import inject from "gulp-inject-string";
import _ from "lodash";
import logger from "./util/logger";
import config from "./config/gulp.config";
import * as pathUtil from "./util/path-util";
import * as markdownUtil from "./util/markdown-util";

gulp.task('posts', function (next) {
  logger.info('Generate Posts:');
  let postDataList = pathUtil.getGlobalPaths(config.input.posts);
  let postList = [];

  _.each(postDataList, function (postUrl) {
    logger.info('Load:', postUrl);
    let post = markdownUtil.parseMarkdown(postUrl);
    postList.push(post);
  });

  postList = postList.sort(function (a, b) {
    return a.created < b.created ? 1 : -1;
  });

  gulp.src(config.emptyFile)
    .pipe(inject.append(JSON.stringify(postList)))
    .pipe(rename(config.output.posts))
    .pipe(gulp.dest(config.buildDir))
    .on('end', function () {
      if (next) {
        next();
      }
    })
  ;
});