require('babel-register');
var argv = require('yargs').argv;
require(['./', argv.filename].join(''));
