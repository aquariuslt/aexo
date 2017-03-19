/* Created by Aquariuslt on 2017-03-11.*/
import gulp from "gulp";
import rename from "gulp-rename";
import inject from "gulp-inject-string";
import _ from "lodash";
import logger from "./util/logger";
import config from "./config/gulp.config";
import fs from "fs";

gulp.task('tags', function () {
  logger.info('Generate Tags Data:');
  let postsDataPath = config.buildDir + '/' + config.output.posts;
  let postListString = fs.readFileSync(postsDataPath).toString();
  let postList = JSON.parse(postListString);

  let tagMap = {};
  _.each(postList, function (post) {
    if (post.tags) {
      let tags = post.tags;
      _.each(tags, function (tag) {
        if (!tagMap.hasOwnProperty(tag)) {
          tagMap[tag] = [];
        }
        tagMap[tag].push({
          title: post.title,
          link: post.link,
          created: post.created,
          updated: post.updated
        });
      });
    }
  });

  let tagList = [];
  for (let tag in tagMap) {
    logger.info('Load Tag:', tag);
    tagList.push({
      tag: tag,
      links: tagMap[tag]
    });
  }


  return gulp.src(config.emptyFile)
    .pipe(inject.append(JSON.stringify(tagList)))
    .pipe(rename(config.output.tags))
    .pipe(gulp.dest(config.buildDir));
});