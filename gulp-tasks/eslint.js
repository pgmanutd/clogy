'use strict';

import gulp from 'gulp';
import { PLUGINS, ARGV, JS_PATHS, errorHandler } from './gulp-config/config';

// Lint Task
gulp.task('eslint', 'Run ESLINT on all js files', () => {
  const file = ARGV.file || [JS_PATHS.src, JS_PATHS.extensions];

  return gulp.src(file)
    .pipe(PLUGINS.plumber({
      errorHandler
    }))
    .pipe(PLUGINS.eslint())
    .pipe(PLUGINS.eslint.format())
    .pipe(PLUGINS.eslint.failAfterError());
}, {
  options: {
    'file=src/test.js': 'Run eslint on one file'
  }
});
