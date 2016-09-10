'use strict';

import gulp from 'gulp';
import { deleteFilesAndFolders, DIRS } from './gulp-config/config';

// Clean Task
gulp.task('clean', 'Clean dist directory', () => {
  return deleteFilesAndFolders(DIRS.dest);
});
