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
    .on('watch:restart', () => {
      log('Server Restarted! Get a cup of coffee!');
    })
    .on('exit', () => {
      log('Server down!');
    });
});
