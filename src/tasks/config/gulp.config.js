/* Created by Aquariuslt on 2017-03-04.*/


let config = {

  cname: 'blog.aquariuslt.com',

  buildDir: 'build',
  distDir: 'dist',
  emptyFile: 'src/tasks/empty.js',

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
  },

  input: {
    posts: 'src/data/posts/**/*.md'
  },

  //posts
  output: {
    posts: 'posts.json',
    categories: 'categories.json',
    tags: 'tags.json'
  }
};

export default config;