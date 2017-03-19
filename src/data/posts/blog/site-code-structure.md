```metadata
{
  "title": "Site项目结构介绍",
  "created": "2016-03-06",
  "category":"Blog",
  "tags": ["Node.js","JavaScript"]
}
```

## Background
应该说是第一个Node.js建站项目.
目的是用于替换JavaWeb的后台
而且可以在过程中练习一下调节样式的水平.

项目本身的结构是从[JShelf](https://github.com/Dantemo/JShelf)开始.
是由于公司内部组织了一次MEAN的一些入门分享.
分成了几个小组,我们小组根据对MEAN的认识魔改了这样一个基本的项目基础结构.
在其原本的结构上.做了做了一些蛋疼的修改
大概是根据`npm install`的提示,更换lib的名字或者升级lib的版本到最新版.
然后删除了一些没必要的模块.

目前已经在我的VPS上运行,[主站](https://aquariuslt.com)是目前的效果.

## Agenda
整个项目的结构从以下几个部分开始介绍,但是在过程中会交错穿插一点互相引用的地方.
- 运作思路
- 代码结构
- 构建过程
- 运行准备

## Thought
从Coding的角度出发,`Node.js`作为服务器端语言的优势之一就是不需要编译,直接重启node进程即可.
而前端代码呢,在开发的时候,我们希望能够达到所见即所得的方式,即html+样式的修改能够直接呈现在页面上.
在生产环境的时候,为了加快访问速度,对前端代码进行必要的打包,压缩,混淆等操作.

作为单页应用的一部分,希望能够进行自动引入所需的js文件,不需要手动维护首页html里面的
```html
<script src="after-respondent.md" type="text/javascript"></script>
```

按照这个想法,理想中的前端开发顺序希望是这样:
- 开发环境
> 1. 以符合`RequireJS规范`编写前端代码
> 2. 前端的html,css,js代码一旦有改动,且通过了IDE的jshint与html格式化检查,立刻热替换到所展示的页面中

- 生产环境
> 1. 将写好的前端代码打包
> 2. 服务器将前端的首页,以及打包后的js,css文件,释放出一个可访问的url作为前端资源文件的全部


## Code Structure

### Folder TreeView
首先我们来看一下项目的目录结构:
> 这是一个遍历到子文件夹5层的项目结构目录.
> 已经去除 `node_modules`文件夹和IDE的文件夹

```
├── dist
│   ├── build
│   │   ├── bundle.css
│   │   ├── bundle.js
│   │   ├── fonts
│   │   │   ├── glyphicons-halflings-regular.eot
│   │   │   ├── glyphicons-halflings-regular.svg
│   │   │   ├── glyphicons-halflings-regular.ttf
│   │   │   ├── glyphicons-halflings-regular.woff
│   │   │   └── glyphicons-halflings-regular.woff2
│   │   └── index.html
│   └── tmp
│       └── templates.js
├── gulp
│   ├── client
│   │   ├── assets.js
│   │   ├── browserify.js
│   │   ├── clean.js
│   │   ├── default.js
│   │   ├── fonts.js
│   │   ├── images.js
│   │   ├── index.js
│   │   ├── minify.js
│   │   ├── serve.js
│   │   ├── styles.js
│   │   ├── templates.js
│   │   ├── watch.js
│   │   ├── watchify.js
│   │   ├── webpack-watch.js
│   │   └── webpack.js
│   ├── config.js
│   ├── index.js
│   └── server
│       ├── index.js
│       └── server.js
├── gulpfile.js
├── node_modules
├── package.json
├── readme.md
├── server.js
├── src
│   ├── client
│   │   ├── home
│   │   │   ├── controllers
│   │   │   │   ├── activities.controller.js
│   │   │   │   ├── header.controller.js
│   │   │   │   ├── home.controller.js
│   │   │   │   └── picture.slide.controller.js
│   │   │   ├── filters
│   │   │   │   ├── activity.array.filter.js
│   │   │   │   └── activity.publish.filter.js
│   │   │   ├── index.js
│   │   │   ├── routes
│   │   │   │   └── home.routes.js
│   │   │   ├── styles
│   │   │   │   ├── about.css
│   │   │   │   ├── angular-ui-bootstrap.css
│   │   │   │   ├── bootstrap-theme.css
│   │   │   │   ├── bootstrap.css
│   │   │   │   ├── common.css
│   │   │   │   └── home.css
│   │   │   └── views
│   │   │       ├── home.about.html
│   │   │       ├── home.footer.html
│   │   │       ├── home.header.html
│   │   │       └── home.index.html
│   │   ├── index.html
│   │   └── index.js
│   └── server
│       └── home
│           ├── config
│           │   └── activities.config.js
│           ├── controllers
│           │   └── activities.controller.js
│           └── routes
│               └── home.routes.js
└── tree.txt

2381 directories, 10428 files

```
### Review with Java-Web Project
回想一下使用maven进行依赖管理的简单Java Web项目.
大致是以下一种目录:
```
├── pom.xml
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com
│   │   │       └── aquariuslt
│   │   └── webapp
│   │       ├── WEB-INF
│   │       │   ├── mvc-dispatcher-servlet.xml
│   │       │   └── web.xml
│   │       ├── booking-create.html
│   │       └── js
│   │           ├── booking
│   │           └── extjs
│   └── test
│       └── java
│           └── com
│               ├── aquariuslt
│               └── springapp
└── target
    ├── ITA-BookingUI
    │   ├── META-INF
    │   │   └── MANIFEST.MF
    │   ├── WEB-INF
    │   │   ├── classes
    │   │   │   └── com
    │   │   ├── lib
    │   │   │   ├── aopalliance-1.0.jar
    │   │   │   ├── commons-logging-1.2.jar
    │   │   │   ├── freemarker-2.3.23.jar
    │   │   │   ├── jackson-core-asl-1.9.13.jar
    │   │   │   ├── jackson-mapper-asl-1.9.13.jar
    │   │   │   ├── servlet-api-2.5.jar
    │   │   │   ├── spring-aop-4.2.0.RELEASE.jar
    │   │   │   ├── spring-beans-4.2.0.RELEASE.jar
    │   │   │   ├── spring-context-4.2.0.RELEASE.jar
    │   │   │   ├── spring-context-support-4.2.0.RELEASE.jar
    │   │   │   ├── spring-core-4.2.0.RELEASE.jar
    │   │   │   ├── spring-expression-4.2.0.RELEASE.jar
    │   │   │   ├── spring-web-4.2.0.RELEASE.jar
    │   │   │   ├── spring-webmvc-4.2.0.RELEASE.jar
    │   │   │   └── tomcat-servlet-api-7.0.63.jar
    │   │   ├── mvc-dispatcher-servlet.xml
    │   │   └── web.xml
    │   ├── booking-create.html
    │   └── js
    │       ├── booking
    │       │   ├── BookingCreateApp.js
    │       │   ├── controller
    │       │   └── view
    │       └── extjs
    │           ├── ext-all-debug.js
    │           ├── ext-theme-neptune
    │           └── resources
    ├── ITA-BookingUI.war
    ├── classes
    │   └── com
    │       └── aquariuslt
    │           └── ita
    ├── generated-sources
    │   └── annotations
    ├── generated-test-sources
    │   └── test-annotations
    └── test-classes
        └── com
            └── aquariuslt
                └── ita

41 directories, 28 files
```
> `src`文件夹作为源代码目录
> `src->main->java`下的代码作为后台的代码
> `src->main->webapp`作为运行时web应用容器的配置,包含了前端的资源文件
> `pom.xml`作为项目的依赖管理,命名选项配置文件
> `target`文件夹则是通过maven构建命令编译构建出来的 输出目录

### Files & Folders
#### package.json
功能等同`pom.xml`

#### src
源代码文件夹.
其中往下分可以分成前端模块和后端模块两个大部分
为了方便分类,将它分成了`client`,`server`
源代码的子层级命名方式为`module`-`mvc feature`-`submodule`

#### gulp
存放`GulpTask`的文件夹.
子文件夹又分成`client`和`server`的tasks.
至于使用Gulp来进行什么样的构建,在下一部分会说明

#### dist
构建出来的前端输出文件夹.类似于JavaWeb里面的target.
但是仅限前端.
这里存放的是经过打包后的前端资源.
在整个应用启动的时候,将会扫描该文件夹,将其全部作为静态资源暴露出url.


## GulpTask
### Gulp
#### What is Gulp
[Gulp官方网站](https://gulpjs.com/)
Gulp.js 是一个自动化构建工具，开发者可以使用它在项目开发过程中自动执行常见任务。

#### How to Use
我使用gulp来干什么呢?
单从前端运行的过程来说.我使用Gulp的Task进行下面一个流程.
![](https://img.alicdn.com/tfscom/TB1DX9QLVXXXXXNaXXXXXXXXXXX.png)


### Build Flow
为了达到最终的目的:单页应用输出最终的一个页面.
```html
<!DOCTYPE html>
<html ng-app="home">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link rel="shortcut icon" href="https://avatars3.githubusercontent.com/u/6554061?v=3&s=460">
    <title>Aquariuslt Home</title>
    <link href="bundle.min.css" rel="stylesheet">
  </head>
  <body>
    <header ng-include="'home/views/home.header.html'" class="navbar navbar-default navbar-fixed-top navbar-inner"></header>
    <div class="page-header">
    </div>
    <div ui-view></div>
    <script src="bundle.min.js"></script>
    <footer ng-include="'home/views/home.footer.html'" class="footer"></footer>
  </body>
</html>
```
我们需要怎么构建出这样一个页面呢?
按照我的gulp tasks
代码上是这样:
```js
//按照以下顺序运行task
if (process.env.NODE_ENV=='release') {
    runSequence(
      'clean',
      ['index', 'styles', 'images', 'fonts', 'assets', 'templates'],
      //'browserify',
      'webpack',
      'minify',
      'server'
    );
  }
```
前面第一个clean只是清除dist文件夹的任务而已而已.

一开始,`index.html`只是这样:
```html
<!DOCTYPE html>
<html ng-app="home">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="https://avatars3.githubusercontent.com/u/6554061?v=3&s=460">
    <title>Aquariuslt Home</title>
    <!--styles-->
  </head>
  <body>
    <header ng-include="'home/views/home.header.html'" class="navbar navbar-default navbar-fixed-top navbar-inner"></header>
    <div class="page-header">
    </div>
    <div ui-view></div>
    <!--scripts-->
    <footer ng-include="'home/views/home.footer.html'" class="footer"></footer>
  </body>
</html>
```
#### index
`index`这个task,主要功能是读取构建的一个配置文件`config.js`获取`index.html`的路径.
紧接着比较傻逼的将html中的
```
<!--styles-->
```
替换成
```
<link href="bundle.min.css" rel="stylesheet">
```
将
```
<!--scripts-->
```
替换成
```
<script src="bundle.min.js"></script>
```
虽然css,js还没有经过打包.但是先替换,存放在dist文件夹下.

#### styles
在配置文件`config.js`里面,需要维护一个css文件夹的正则路径.匹配到多个路径下的css位置供扫描.
css文件的路径大概是这样子的:
```
styles: [config.folder.src + '/client/**/styles/*.css'],
```
即src文件夹下,匹配到client下的隔层文件夹里的所有叫`styles`的子文件夹下的所有css文件
`styles`主要是
将扫描出来的所有css文件打包在一起,融合成 刚刚替换成的`bundle.min.js`

### images,fonts,assets
这三个tasks功能类似.即也是读取配置文件所维护的一个匹配所有静态资源文件
将其放到dist下对应的文件夹内.

### templates
在配置文件`config.js`,控制将一个负责控制所有视图(views)的路径
```
templates: config.folder.src + '/client/**/*.html',
```
`templates`这个tasks主要是扫描所有`.html`的视图文件,用于生成一些 `ngTempalte`供angular调用html模板
其实最后这些生成的模板将会合并进js中.
大概会变成下面这样:
```js
module.exports = angular.module("templates", []).run(["$templateCache", function($templateCache) {
$templateCache.put("index.html","<!DOCTYPE html>\n<html ng-app=\"home\">\n  <head>\n    <meta charset=\"utf-8\">\n    ...");
$templateCache.put("home/views/home.about.html","<div role=\"main\" class=\"container\">\n  <div class=\"row\">\n    <...");
$templateCache.put("home/views/home.footer.html","<div class=\"container\">\n  <div class=\"center-block\">\n    <h5>B...");
$templateCache.put("home/views/home.header.html","<div class=\"container\" ng-controller=\"headerController\">\n  <div...");
$templateCache.put("home/views/home.index.html","<div class=\"container\">\n  <div class=\"jumbotron\">\n    <div clas...");
}]);
```


### webpack/browserify
这两个是现在主流的js打包工具.配合自身的一些插件.主要做到能够将以`requirejs`方式编的方式的代码.
为了方便开发和调试,
`webpack`和`browserify`都有一个热打包插件:过程都是监听所有js源代码的路径.当文件更新的时候,自动在打包一次.部署到运行的服务器上.


### minify
这个以前叫做uglify,就是压缩js代码,变量名混淆.






