#! /usr/bin/env node


import * as yargs from "yargs";
import shell from "shelljs";
import "shelljs/global";

const githubRepo = 'https://github.com/Aquariuslt/Aexo.git';


let argv = yargs
  .usage('$0 <cmd> [args]')
  .command('new [appName]', 'create new aexo app', {
    appName: {
      default: 'aexo-app'
    }
  }, createApp)
  .command('run', 'run aexo app', runApp)
  .command('deploy', 'deploy aexo app on github pages', deployApp)
  .help()
  .argv;


function createApp(args) {
  if (!which('git')) {
    console('Sorry, this script requires git');
    shell.exit(1);
  }
  let appName = args.appName;
  console.log('creating new aexo app:', appName);
  let cloneCommand = 'git clone ' + githubRepo + ' ' + appName;

  console.log(cloneCommand);
  shell.exec(cloneCommand, function (code, stdout, stderr) {
    console.log(stdout);
    console.log('clone complete')
  });
}




function runApp(args) {
  console.log('enter aexo app.');
  shell.exec('npm start')
}

function deployApp(args) {
  console.log('deploying aexo app.');
  shell.exec('npm run deploy')
}
