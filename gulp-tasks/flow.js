'use strict';

import gulp from 'gulp';
import child_process from 'child_process';
import flow from 'flow-bin';

import { PLUGINS } from './gulp-config/config';

const execFile = child_process.execFile;

// Flow Task
gulp.task('flow', 'Run flow check on all js files', (done) => {
  execFile(flow, ['check'], (err, stdout) => {
    if (err) {
      throw new PLUGINS.util.PluginError({
        plugin: '[flow]',
        message: stdout
      });
    }

    done();
  });
});
