#! /usr/bin/env node

//noinspection JSUnresolvedVariable
let argv = require('yargs').argv;
let _ = require('lodash');


const AVAILABLE_CLI_COMMANDS = ['new', 'run', 'deploy'];

let args = argv._;

if (_.isEmpty(args)) {
  console.log('hello aexo');
}
