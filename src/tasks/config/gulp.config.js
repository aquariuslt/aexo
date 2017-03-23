/* Created by Aquariuslt on 2017-03-04.*/

/**
 * Gulp Tasks building config
 * Suppose to be no move
 * The moving config suppose to be loaded by application.yml
 * The environment config suppose to be loaded load by environment.ts
 * */

let config = {

  appConfig: 'application.yml',
  buildDir: 'build',
  distDir: 'dist',
  cacheDir: '.cache',
  emptyFile: 'src/tasks/empty.js',
  manifest: 'src/manifest.webapp',

  input: {
    posts: 'src/data/posts/**/*.md'
  },

  output: {
    posts: 'posts.json',
    categories: 'categories.json',
    tags: 'tags.json',
    application: 'application.json'
  }


};

export default config;
