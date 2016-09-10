'use strict';

import gulp from 'gulp';

const HELP_TASK = gulp.tasks.help;

// Help Commands
gulp.task('help', 'Prints commands for help', (done) => {
  console.log('Important Commands:\n');
  console.log(' gulp                              Run in Development mode\n');
  console.log(' gulp --type=production            Run in Production mode\n');
  console.log(' gulp eslint                       Run eslint on all js files\n');
  console.log(' gulp eslint --file=src/test.js    Run eslint on js file specified\n');
  console.log(' gulp flow                         Run flow check on all js files\n');
  console.log(' gulp test                         Run unit test, coverage using');
  console.log('                                   (mocha, chai, sinon),.only for single test\n');
  console.log(' gulp test --browsers=PhantomJS,Chrome,Firefox,IE,IE9,IE10');
  console.log('                                   Any one or more, default is PhantomJS\n');
  HELP_TASK.fn.call(gulp, done);
});
