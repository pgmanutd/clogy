'use strict';

import gulp from 'gulp';
import { PLUGINS, DIRS, JS_PATHS, errorHandler } from './gulp-config/config';

// Copy Task
gulp.task('copy', 'Copies files from dist folder to lib folder', () => {
  return gulp.src(JS_PATHS.libSrc)
    .pipe(PLUGINS.plumber({
      errorHandler
    }))
    .pipe(gulp.dest(DIRS.lib));
});
