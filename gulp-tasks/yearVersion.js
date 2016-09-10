'use strict';

import gulp from 'gulp';
import { PLUGINS, errorHandler } from './gulp-config/config';
import pkg from '../package';

const COPYRIGHT_PATHS = {
  src: ['./LICENSE', './README.md'],
  dest: './'
};

// Year Update Task
gulp.task('year:version', 'Updates copyright year and version', () => {
  return gulp.src(COPYRIGHT_PATHS.src)
    .pipe(PLUGINS.plumber({
      errorHandler
    }))
    .pipe(PLUGINS.replace(/Copyright \(c\) \d{4}/g, `Copyright (c) ${new Date().getFullYear()}`))
    .pipe(PLUGINS.replace(/\/\d.\d.\d\//g, `/${pkg.version}/`))
    .pipe(PLUGINS.replace(/@\d.\d.\d\//g, `@${pkg.version}/`))
    .pipe(gulp.dest(COPYRIGHT_PATHS.dest));
});
