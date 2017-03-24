#! /usr/bin/env node
"use strict";

var _yargs = require("yargs");

var yargs = _interopRequireWildcard(_yargs);

var _shelljs = require("shelljs");

var _shelljs2 = _interopRequireDefault(_shelljs);

require("shelljs/global");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var githubRepo = 'https://github.com/Aquariuslt/Aexo.git';

var argv = yargs.usage('$0 <cmd> [args]').command('new [appName]', 'create new aexo app', {
  appName: {
    default: 'aexo-app'
  }
}, createApp).command('run', 'run aexo app', runApp).command('deploy', 'deploy aexo app on github pages', deployApp).help().argv;

function createApp(args) {
  if (!which('git')) {
    console('Sorry, this script requires git');
    _shelljs2.default.exit(1);
  }
  var appName = args.appName;
  console.log('creating new aexo app:', appName);
  var cloneCommand = 'git clone ' + githubRepo + ' ' + appName;

  console.log(cloneCommand);
  _shelljs2.default.exec(cloneCommand, function (code, stdout, stderr) {
    console.log(stdout);
    console.log('clone complete');
  });
}

function runApp(args) {
  console.log('enter aexo app.');
  _shelljs2.default.exec('npm start');
}

function deployApp(args) {
  console.log('deploying aexo app.');
  _shelljs2.default.exec('npm run deploy');
}
