//noinspection JSUnusedGlobalSymbols
export const environment = {
  production: true,

  datasource: {
    posts: './posts.json',
    tags: './tags.json',
    categories: './categories.json'
  },
  blog: {
    avator: 'assets/images/avator.png',
    avatorBackground: null,
    siteName: 'Aquariuslt Home',
    author: 'Aquariuslt',
    description: 'Coder,WoWer',
    externalLinks: [
      {
        label: 'Social',
        links: [
          {
            url: 'https://github.com/aquariuslt',
            displayName: 'Github',
            description: 'Github'
          },
          {
            url: 'https://twitter.com/superaquariuslt',
            displayName: 'Twitter',
            description: 'Twitter'
          }
        ]
      },
      {
        label: 'Friend Links',
        links: [
          {
            displayName: 'wxsm blog',
            url: 'https://wxsm.space',
            description: 'Kary Gor博客,前端大神'
          },
          {
            displayName: 'lousama',
            url: 'http://lousama.com',
            description: ''
          },
          {
            displayName: 'NotFound404',
            url: 'https://github.com/404NoFound',
            description: '车底良哥'
          },
          {
            displayName: '13c',
            url: 'http://corydon.cc',
            description: 'Android Big Deal in Beijing'
          }
        ]
      }
    ],
    // Enable posts data menus in sidenav
    tags: {
      sidenav: true,
      // filter the data from home post list, only show the non-hidden at home page
      // but can will detail when click into tags list
      filter: true,
      hidden: [],
    },
    categories: {
      sidenav: true,
      filter: true,
      hidden: [
        'Else'
      ]
    },

    about: {
      enable: true
    },


    disqus: {
      enable: true,
      shortName: 'aquariuslt'
    },


  },

  https: {
    enable: true,
    force: true
  }
};
