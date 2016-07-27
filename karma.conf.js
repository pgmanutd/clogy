'use strict';

import pkg from './package';
import path from 'path';

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
      'karma-coverage'
    ],
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      `${DIRS.src}/**/*.spec.js`
    ],
    browsers: ['PhantomJS'], // Specify 'PhantomJS', 'Chrome', 'Firefox', 'IE'
    reporters: ['progress', 'coverage'],
    colors: true,
    preprocessors: {
      [`${DIRS.src}/**/*.spec.js`]: ['webpack']
    },
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage'
    },
    logLevel: config.LOG_INFO,
    singleRun: true,
    webpack: {
      module: {
        preLoaders: [{
          test: /\.jsx?$/,
          loader: 'isparta',
          exclude: [
            /node_modules/,
            /\.spec\.js/
          ],
          include: path.resolve(__dirname, DIRS.src)
        }],
        loaders: [{
          test: /\.jsx?$/,
          loader: 'babel',
          exclude: /node_modules/,
          include: [
            path.resolve(__dirname, DIRS.src)
          ]
        }]
      }
    },
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    }
  });
};
