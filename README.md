# AEXO - Another Static Blog using Angular


## Features:
- Static Blog
- Deploy on Github Pages
- Support Github Pages custom domain hosting
- Markdown + metadata writing posts

## Get Started

```bash
npm install aexo -g

aexo new new-blog-app && cd new-blog-app && npm install
aexo run
```

Then will auto open your browser at [http://localhost:4200](http://localhost:4200)

## Configurable
See application.yml in aexo-app folder.

here is a example first:
```yaml
# This is AEXO Application YML
# Update your config here


# Blog Variables
blog:
  name: 'AEXO'
  # Avator Relative URL, example: assets/images/avator.png
  avator: 'assets/images/avator.png'
  author: 'Author'
  description: 'Description'
  externalLinks:
    -
      label: 'Social'
      links:
        -
          url: 'https://github.com/aquariuslt'
          displayName: 'Github'
          description: 'Github'

    -
      label: 'Friend Links'
      links:
        -
          displayName: 'Aquariuslt Blog'
          url: 'https://blog.aquariuslt.com'
          description: ''



  # Hidden Category Lists
  categories:
    filter: true
    hidden:
      - 'Secret'

  tags:
    filter: true
    hidden:
      - 'Secret'

  # Enable About Page
  about:
    enable: true


  # Disqus Config
  # Replace your disqus config here.
  disqus:
    enable: true
    shortName: 'disqus'

  # Progressive Web App
  pwa:
    enable: true
    name: 'Your AEXO app name'
    shortName: 'Blog'
    description: 'Your AEXO app description'
    icon: 'app-icon.png'
    developer:
      name: 'Aquariuslt'
      url: 'https://github.com/aquariuslt'

# Blog Deploy Options
# Domain
# cname: 'blog.yoursite.com'

# Deploy
# Replace with your github.io repository url here
deploy:
  repo: 'https://github.com/xxxx/xxxx.github.io.git'
  remote: 'origin'
  branch: 'master'
  cacheDir: '.cache'
  clone: '.cache'

```


Like `Hexo`, you can customize these features as configurable.

And mostly, you can replace the media in the relative path in aexo app folder.



## Further understanding


## Deploy 
```bash
aexo deploy
```
