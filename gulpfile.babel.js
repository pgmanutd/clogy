'use strict';

import gulp from 'gulp';
import runSequence from 'run-sequence';
import gulpHelp from 'gulp-help';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import removeDirectories from 'remove-empty-directories';
import karma from 'karma';
import yargs from 'yargs';
import webpack from 'webpack';
import webpackDevConfig from './webpack.config.dev.babel';
import webpackProdConfig from './webpack.config.prod.babel';
import pkg from './package';

gulpHelp(gulp);

const PLUGINS = gulpLoadPlugins({
  lazy: false
});
const KARMA_SERVER = karma.Server;
const ARGV = yargs.argv;
const ENV = {
  dev: 'development',
  prod: 'production',
  test: 'test'
};
const DIRS = pkg.config.dirs;
const JS_PATHS = {
  src: `${DIRS.src}/**/*.js`,
  libSrc: `${DIRS.dest}/**/*`,
  dest: `${DIRS.dest}`
};
const COPYRIGHT_PATHS = {
  src: ['./LICENSE', './README.md'],
  dest: './'
};
const IS_PRODUCTION = ARGV.type === ENV.prod;
const KARMA_CONFIG = `${__dirname}/karma.conf.js`;
const HELP_TASK = gulp.tasks.help;

gulp.task('set-dev-node-env', () => {
  return process.env.NODE_ENV = ENV.dev;
});

gulp.task('set-prod-node-env', () => {
  return process.env.NODE_ENV = ENV.prod;
});

gulp.task('set-test-node-env', () => {
  return process.env.NODE_ENV = ENV.test;
});

// Prints version
gulp.task('version', 'Prints the version', [],
  () => log(`${pkg.version}v`), {
    aliases: ['v', 'V']
  });

// Updates Patch version
gulp.task('version:patch', 'Updates the patch version', () => {
  gulp.src(['./package.json'])
    .pipe(PLUGINS.bump({ type: 'patch' }))
    .pipe(gulp.dest('./'));
});

// Updates Minor version
gulp.task('version:minor', 'Updates the minor version', () => {
  gulp.src(['./package.json'])
    .pipe(PLUGINS.bump({ type: 'minor' }))
    .pipe(gulp.dest('./'));
});

// Updates Major version
gulp.task('version:major', 'Updates the major version', () => {
  gulp.src(['./package.json'])
    .pipe(PLUGINS.bump({ type: 'major' }))
    .pipe(gulp.dest('./'));
});

// Help Commands
gulp.task('help', 'Prints commands for help', (done) => {
  console.log('Important Commands:\n');
  console.log(' gulp                              Run in Development mode\n');
  console.log(' gulp --type=production            Run in Production mode\n');
  console.log(' gulp eslint                       Run eslint on all js files\n');
  console.log(' gulp eslint --file=src/test.js    Run eslint on js file specified\n');
  console.log(' gulp test                         Run unit test, coverage using');
  console.log('                                   (mocha, chai, sinon),.only for single test\n');
  console.log(' gulp test --browsers=PhantomJS,Chrome,Firefox,IE');
  console.log('                                   Any one or more, default is PhantomJS\n');
  HELP_TASK.fn.call(gulp, done);
});

// Clean Task
gulp.task('clean', 'Clean dist directory', () => {
  return deleteFilesAndFolders(DIRS.dest);
});

// Remove empty directories
gulp.task('clean:directories', 'Remove empty directries', () => {
  return removeDirectories(DIRS.dest);
});

// Copy Task
gulp.task('copy', 'Copies files from dist folder to lib folder', () => {
  return gulp.src(JS_PATHS.libSrc)
    .pipe(PLUGINS.plumber({
      errorHandler: Error
    }))
    .pipe(gulp.dest(DIRS.lib));
});

// Lint Task
gulp.task('eslint', 'Run ESLINT on all js files', () => {
  const file = ARGV.file || JS_PATHS.src;

  return gulp.src(file)
    .pipe(PLUGINS.plumber({
      errorHandler: Error
    }))
    .pipe(PLUGINS.eslint())
    .pipe(PLUGINS.eslint.format())
    .pipe(PLUGINS.eslint.failAfterError());
}, {
  options: {
    'file=src/test.js': 'Run eslint on one file'
  }
});

// Concatenate and minify all JS files using Webpack
gulp.task('scripts', 'Compiles, Bundles, Minifies JS using Webpack', (callback) => {
  let isCallbackCalled = false;

  webpack((
    IS_PRODUCTION ?
    webpackProdConfig :
    // FIXME: I hate mutation
    (webpackDevConfig.watch = !ARGV.unwatch, webpackDevConfig)), (err, stats) => {

    if (err) throw new PLUGINS.util.PluginError('webpack', err);

    PLUGINS.util.log('[webpack]', stats.toString({
      colors: true
    }));

    if (!isCallbackCalled) {
      isCallbackCalled = true;
      callback();
    }
  });
});

// Karma Runner
gulp.task('test', 'Run unit test using Karma', ['set-test-node-env'], (done) => {
  const conf = {
    configFile: KARMA_CONFIG
  };

  if (ARGV.browsers) {
    conf.browsers = [...(ARGV.browsers.split(','))]
  }

  new KARMA_SERVER(conf, done).start();
}, {
  options: {
    'browsers=PhantomJS,Chrome,Firefox,IE': 'Choose browser to run unit test'
  }
});

// Year Update Task
gulp.task('year:version', 'Updates copyright year and version', () => {
  return gulp.src(COPYRIGHT_PATHS.src)
    .pipe(PLUGINS.plumber({
      errorHandler: Error
    }))
    .pipe(PLUGINS.replace(/Copyright \(c\) \d{4}/g, `Copyright (c) ${new Date().getFullYear()}`))
    .pipe(PLUGINS.replace(/\/\d.\d.\d\//g, `/${pkg.version}/`))
    .pipe(gulp.dest(COPYRIGHT_PATHS.dest));
});

// Default Task
gulp.task('default', 'Default Task', (done) => {
  const allTasks = ['clean', 'scripts', 'clean:directories'];

  if (IS_PRODUCTION) {
    allTasks.unshift('set-prod-node-env');
  } else {
    allTasks.unshift('set-dev-node-env');
  }

  runSequence(...allTasks, () => {
    readyMessage();
    done();
  });
}, {
  options: {
    'unwatch': 'Development mode, no watch, default watch the files',
    'type=production': 'Run on production, Default is development'
  }
});

/////////////////////

function readyMessage() {
  log('************');
  log('Ready! Let the hacking begin!');
  log('************');
}

// Error handler
function Error(msg) {
  ({
    message: msg = msg
  } = msg);
  log(`Error: ${msg}`);
  PLUGINS.util.beep();
}

// log to console using util
function log(msg) {
  PLUGINS.util.log(PLUGINS.util.colors.blue(msg));
}

function deleteFilesAndFolders(path) {
  return del.sync([path]);
}
