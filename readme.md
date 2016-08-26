## Aexo
Github your blog as github pages,static web resource with markdown source code.

[![Build Status](https://api.travis-ci.org/Aquariuslt/Aexo.png)](https://travis-ci.org/Aquariuslt/Aexo)  


## ScreenShot

### Desktop View:Responsive columns for 1080p,720p,480p
![Full-Size at 1080p](https://img.alicdn.com/tfscom/TB1sCjCMVXXXXXgXXXXXXXXXXXX.png)

### Mobile View:Only 1 column waterfall
![Mobile View](https://img.alicdn.com/tfscom/TB1uMTzMVXXXXbXXXXXXXXXXXXX.png)

### Custom Sidebar
![Customize Sidebar](https://img.alicdn.com/tfscom/TB1X8PrMVXXXXcLXpXXXXXXXXXX.png)

## Getting Started

### OverView
To use Aexo for generating your blog step by step,just follow this overview.

> 0.Check your system environment requirement.  
> 1.Clone or Fork Aexo from Github  
> 2.Update your siteConfig for customize  
> 3.Run command 'gulp s' for local view or run command 'gulp d' for deploy you blog at github pages.  

That's all.

### Check you system environment requirement
Running and deploying `Aexo` requires `Node.js` & `Git` environment.
Check if you have install both of it.
Recommend:
- `node` version >= `4.4.0`
- `npm` version >= `3.8.0`
- `git` version >= `2.0`

As `Aexo` use git to update you site on github,it's better for you to save your ssh key in github.
So that it can save your time to input username and password every time executing git push command.

### Clone or Fork Aexo from Github
```sh
git clone https://github.com/Aquariuslt/Aexo.git
```

### Install runtime building package
```sh
npm install
```

### Customize you configuration
Open `tasks/config/siteConfig.js` under project folder.  
You will see whole site config file like below , and please update the values it before you use it.
```js
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
```
#### siteName
Name of your site,it will influence html title,label in sidebar and header.

#### siteDescription
Description of your site,it will influence site bar subtitle label.

#### profileLinks
If you are wanna add more social in the profile link like `google+`,`twitter`,`github`....
Update it and the icon values should be in the list of [Google Material Design icons](https://klarsys.github.io/angular-material-icons/)

#### subSiteLinks
If you want to add more site from you **It seems useless..**

#### friendLinks
Add you friend links for your site.


#### disqusShortName
`Disqus` is the most standard,popular,biggerlity community plugin for you website.  
Please register disqus and apply a disqus shortname for your website before.  

> Please don't use demo as your site shortname...


#### deployOptions (Optional)

You should prepare your github pages settings before:  
1. Create a repository name as `${your.github.profile.name}.github.io`
For example,like me,using `aquariuslt.github.io` cause my github profile is `https://github.com/Aquariuslt`

2. Add your ssh keys in repository's settings.   
So that no need to input username/password every time deploy to github.  

Please comment `deployOptions` if you don't need to use it.

#### cname (Optional)
If you want to use github pages under your custom domain.

1. set `cname` values your domain.  
Example as me using `blog.aquariuslt.com`.

2. set your domain cname point to your github pages repository in you domain carrier.  
Example set one cname of my domain `aquariuslt.com`:`blog.aquariuslt.com` point to `aquariuslt.github.io`.  

Please comment `cname` if you don't need to use it.


### Local Testing & Run
```sh
gulp t
gulp s
```

Then you can view it in [http://localhost:8080](http://localhost:8080) if run normal.

### Deploy to Github
```sh
gulp d
```

