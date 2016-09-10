'use strict';

import gulp from 'gulp';
import path from 'path';
import karma from 'karma';
import { ARGV, ENV } from './gulp-config/config';

const KARMA_SERVER = karma.Server;
const KARMA_CONFIG = path.resolve(__dirname, '../karma.conf.js');

gulp.task('set-test-node-env', () => {
  return process.env.NODE_ENV = ENV.test;
});

// Karma Runner
gulp.task('test', 'Run unit test using Karma', ['set-test-node-env'], (done) => {
  const conf = {
    configFile: KARMA_CONFIG
  };

  if (ARGV.browsers) {
    conf.browsers = [...(ARGV.browsers.split(','))];
  }

  new KARMA_SERVER(conf, done).start();
}, {
  options: {
    'browsers=PhantomJS,Chrome,Firefox,IE,IE9,IE10': 'Choose browser to run unit test'
  }
});
