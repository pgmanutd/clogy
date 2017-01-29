'use strict';

// Kind of barrel (What Angular 2 team calls it)

import del from 'del';
import gulpLoadPlugins from 'gulp-load-plugins';
import yargs from 'yargs';
import pkg from '../../package';

export const PLUGINS = gulpLoadPlugins({
  lazy: false
});
export const ARGV = yargs.argv;
export const ENV = pkg.config.env;
export const DIRS = pkg.config.dirs;
export const JS_PATHS = {
  src: `${DIRS.src}/**/*.js`,
  libSrc: `${DIRS.dest}/**/*`,
  dest: `${DIRS.dest}`,
  extensions: `${DIRS.extensions}/**/*.js`,
};
export const IS_PRODUCTION = ARGV.type === ENV.prod;

export function deleteFilesAndFolders(path) {
  return del.sync([path]);
}

// Error handler
export function errorHandler(msg) {
  ({
    message: msg = msg
  } = msg);
  log(`Error: ${msg}`);
  PLUGINS.util.beep();
}

// log to console using util
export function log(...msg) {
  PLUGINS.util.log(PLUGINS.util.colors.blue(...msg));
}
