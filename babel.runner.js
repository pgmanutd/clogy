require('babel-core/register');
var argv = require('yargs').argv;
require(['./', argv.filename].join(''));
