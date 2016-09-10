'use strict';

import gulp from 'gulp';
import removeDirectories from 'remove-empty-directories';
import { DIRS } from './gulp-config/config';

// Remove empty directories
gulp.task('clean:directories', 'Remove empty directories', () => {
  return removeDirectories(DIRS.dest);
});
