'use strict';

import gulp from 'gulp';
import { PLUGINS, JS_PATHS, errorHandler } from './gulp-config/config';

// Flow Task
gulp.task('flow', 'Run flow check on all js files', () => {
  return gulp.src(JS_PATHS.src)
    .pipe(PLUGINS.plumber({
      errorHandler
    }))
    .pipe(PLUGINS.flowtype({
      all: false,
      weak: false,
      killFlow: true,
      beep: true,
      abort: true
    }));
});
