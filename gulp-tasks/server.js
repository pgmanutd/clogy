'use strict';

import gulp from 'gulp';
import { PLUGINS, log } from './gulp-config/config';
import pkg from '../package';

// Server Task
gulp.task('forever', 'Run Express Server', () => {
  const foreverMonitorOptions = {
    env: process.env,
    args: ['--filename', pkg.config.server],
    watch: false
  };

  PLUGINS.foreverMonitor(pkg.config.main, foreverMonitorOptions)
    .on('start', () => {
      log('************');
      log('Server Starting..!!');
      log('************');
    })
    .on('exit', () => {
      log('Server down!');
    });
});
