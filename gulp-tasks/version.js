'use strict';

import gulp from 'gulp';
import { PLUGINS, log } from './gulp-config/config';
import pkg from '../package';

// Prints version
gulp.task('version', 'Prints the version', [],
  () => log(`${pkg.version}v`), {
    aliases: ['v', 'V']
  });

// Updates Patch version
gulp.task('version:patch', 'Updates the patch version', () => {
  return gulp.src(['./package.json'])
    .pipe(PLUGINS.bump({ type: 'patch' }))
    .pipe(gulp.dest('./'));
});

// Updates Minor version
gulp.task('version:minor', 'Updates the minor version', () => {
  return gulp.src(['./package.json'])
    .pipe(PLUGINS.bump({ type: 'minor' }))
    .pipe(gulp.dest('./'));
});

// Updates Major version
gulp.task('version:major', 'Updates the major version', () => {
  return gulp.src(['./package.json'])
    .pipe(PLUGINS.bump({ type: 'major' }))
    .pipe(gulp.dest('./'));
});
