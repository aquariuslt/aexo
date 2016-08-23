/** Created by Aquariuslt on 6/28/16.*/
module.exports = {
  siteName: 'Aexo',
  siteDescription:'Static blog application under material design.',
  profileLinks:[
    {
      link:'Github',
      icon:'keyboard',
      description:'https://github.com/Aquariuslt'
    },
    {
      link:'Twitter',
      icon:'twitter',
      description:'https://twitter.com/superaquariuslt'
    }
  ],
  subSiteLinks: [
    {
      name: 'Author',
      link: 'http://blog.aquariuslt.com',
      description: 'Author\'s blog'
    }
  ],

  friendLinks: [
    {
      name: 'wxsm blog',
      link: 'http://anubarak.com',
      description: 'Kary Gor博客,前端大神'
    }
  ],

  disqusShortName: 'demo',
  
  
  /**
   * Github Pages deploy config
   * */
  deployOptions:{
    remoteUrl:'Your.Git.Repository.Url',
    origin:'origin',
    branch:'master',
    cacheDir:'.cache'
  },

  cname:'Your.domain'
};