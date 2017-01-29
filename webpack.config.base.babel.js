'use strict';

import webpack from 'webpack';
import path from 'path';
import pkg from './package';
import * as fp from 'lodash/fp';

const {
  name: MODULE_NAME,
  config: {
    dirs: DIRS
  }
} = pkg;

function customizer(objValue, srcValue) {
  if (fp.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

const resolve = {
  extensions: ['', '.js']
};

const webpackModule = {
  loaders: [{
    loader: 'babel-loader',
    query: {
      compact: false,
      cacheDirectory: true
    },
    include: [
      path.resolve(__dirname, DIRS.src),
      path.resolve(__dirname, DIRS.extensions)
    ],
    exclude: /node_modules/,
    test: /\.js?$/
  }]
};

const webpackBaseConfig = {
  entry: {
    [MODULE_NAME]: [path.resolve(__dirname, `${DIRS.src}/index`)]
  },
  output: {
    path: path.resolve(__dirname, DIRS.dest),
    library: MODULE_NAME,
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.BannerPlugin(
      `${pkg.name} - v${pkg.version} * ${pkg.homepage} * (c) ${new Date().getFullYear()} ${pkg.author.name} * licensed ${pkg.license}`
    ),
    new webpack.NoErrorsPlugin()
  ],
  module: webpackModule,
  resolve
};

export { webpackBaseConfig, webpackModule, resolve, customizer, MODULE_NAME };
