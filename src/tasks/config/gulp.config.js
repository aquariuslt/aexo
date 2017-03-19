/* Created by Aquariuslt on 2017-03-04.*/

/**
 * Gulp Tasks building config
 * Suppose to be no move
 * The moving config suppose to be loaded by application.yml
 * The environment config suppose to be loaded load by environment.ts
 * */

let config = {

  appConfig:'application.yml',
  buildDir: 'build',
  distDir: 'dist',
  emptyFile: 'src/tasks/empty.js',

  input: {
    posts: 'src/data/posts/**/*.md'
  },

  output: {
    posts: 'posts.json',
    categories: 'categories.json',
    tags: 'tags.json'
  },


  cname: 'blog.aquariuslt.com',
  deployOptions: {
    repo: 'https://github.com/Aquariuslt/aquariuslt.github.io.git',
    // repo: 'https://git.coding.net/Aquariuslt/aquariuslt.coding.me.git',
    remote: 'origin',
    branch: 'master',
    cacheDir: '.cache',
    clone: '.cache',
    logger: function (message) {
      console.log(message);
    }
  }


};

export default config;
