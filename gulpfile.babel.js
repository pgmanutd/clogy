'use strict';

import gulp from 'gulp';
import requireDir from 'require-dir';
import runSequence from 'run-sequence';
import gulpHelp from 'gulp-help';
import { ENV, IS_PRODUCTION, log } from './gulp-tasks/gulp-config/config';

gulpHelp(gulp);

/* No need of separate task files for these */
gulp.task('set-dev-node-env', () => {
  return process.env.NODE_ENV = ENV.dev;
});

gulp.task('set-prod-node-env', () => {
  return process.env.NODE_ENV = ENV.prod;
});
/********************************************/

requireDir('./gulp-tasks');

// Default Task
gulp.task('default', 'Default Task', (done) => {
  const allTasks = ['clean', 'scripts', 'clean:directories'];

  if (IS_PRODUCTION) {
    allTasks.unshift('set-prod-node-env');
  } else {
    allTasks.unshift('set-dev-node-env');
  }

  runSequence(...allTasks, () => {
    readyMessage();
    done();
  });
}, {
  options: {
    'unwatch': 'Development mode, no watch, default watch the files',
    'type=production': 'Run on production, Default is development'
  }
});

/////////////////////

function readyMessage() {
  log('************');
  log('Ready! Let the hacking begin!');
  log('************');
}
