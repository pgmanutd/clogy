'use strict';

import gulp from 'gulp';
import webpack from 'webpack';
import webpackDevConfig from '../webpack.config.dev.babel';
import webpackProdConfig from '../webpack.config.prod.babel';
import { PLUGINS, IS_PRODUCTION, ARGV, log } from './gulp-config/config';

// Concatenate and minify all JS files using Webpack
gulp.task('scripts', 'Compiles, Bundles, Minifies JS using Webpack', (callback) => {
  let isCallbackCalled = false;

  webpack((
    IS_PRODUCTION ?
    webpackProdConfig :
    // FIXME: I hate mutation
    (webpackDevConfig.watch = !ARGV.unwatch, webpackDevConfig)), (err, stats) => {

    if (err) throw new PLUGINS.util.PluginError('webpack', err);

    log('[webpack]', stats.toString({
      colors: true
    }));

    if (!isCallbackCalled) {
      isCallbackCalled = true;
      callback();
    }
  });
});
