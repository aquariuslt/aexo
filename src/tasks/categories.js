/* Created by Aquariuslt on 2017-03-11.*/
import gulp from "gulp";
import rename from "gulp-rename";
import inject from "gulp-inject-string";
import _ from "lodash";
import logger from "./util/logger";
import config from "./config/gulp.config";
import fs from "fs";

gulp.task('categories', function () {
  logger.info('Generate Categories Data:');
  let postsDataPath = config.buildDir + '/' + config.output.posts;
  let postListString = fs.readFileSync(postsDataPath).toString();
  let postList = JSON.parse(postListString);

  let categoryMap = {};
  _.each(postList, function (post) {
    if (post.category) {
      let category = post.category;
      if (!categoryMap.hasOwnProperty(category)) {
        categoryMap[category] = [];
      }
      categoryMap[category].push({
        title: post.title,
        link: post.link,
        created: post.created,
        updated: post.updated
      })
    }
  });

  let categoryList = [];
  for (let category in categoryMap) {
    logger.info('Load Categories:', category);
    categoryList.push({
      category: category,
      links: categoryMap[category]
    });
  }


  return gulp.src(config.emptyFile)
    .pipe(inject.append(JSON.stringify(categoryList)))
    .pipe(rename(config.output.categories))
    .pipe(gulp.dest(config.buildDir));
});
