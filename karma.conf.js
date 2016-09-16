'use strict';

import pkg from './package';
import { webpackModule } from './webpack.config.base.babel';

const DIRS = pkg.config.dirs;

// using old syntax because of babel, it will output exports.module
module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon', 'sinon-chai'],
    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-sinon',
      'karma-sinon-chai',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-ie-launcher',
      'karma-webpack',
      'karma-coverage',
      'karma-sourcemap-loader',
      'karma-spec-reporter'
    ],
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      `${DIRS.src}/**/*.spec.js`
    ],
    browsers: ['PhantomJS'], // Specify 'PhantomJS', 'Chrome', 'Firefox', 'IE', 'IE9', 'IE10'
    reporters: ['spec', 'coverage'],
    colors: true,
    preprocessors: {
      [`${DIRS.src}/**/*.spec.js`]: ['webpack', 'sourcemap']
    },
    specReporter: {
      maxLogLines: 5, // limit number of lines logged per test
      suppressErrorSummary: true, // do not print error summary
      suppressFailed: false, // do not print information about failed tests
      suppressPassed: false, // do not print information about passed tests
      suppressSkipped: true, // do not print information about skipped tests
      showSpecTiming: true // print the time elapsed for each spec
    },
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage'
    },
    customLaunchers: {
      IE9: {
        base: 'IE',
        'x-ua-compatible': 'IE=EmulateIE9'
      },
      IE10: {
        base: 'IE',
        'x-ua-compatible': 'IE=EmulateIE10'
      }
    },
    logLevel: config.LOG_ERROR, // console.log, console.error
    singleRun: true,
    webpack: {
      module: webpackModule,
      devtool: 'inline-source-map'
    },
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    }
  });
};
