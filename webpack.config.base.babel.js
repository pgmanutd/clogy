'use strict';

import webpack from 'webpack';
import path from 'path';
import pkg from './package';
import _ from 'lodash';

const {
  name: MODULE_NAME,
  config: {
    dirs: DIRS
  }
} = pkg;

function customizer(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

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
      `${pkg.name} - v${pkg.version} * ${pkg.homepage} * (c) ${new Date().getFullYear()} ${pkg.author.name} * licensed ${pkg.licenses[0].type}`
    ),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      loader: 'babel-loader',
      query: {
        compact: false
      },
      include: [
        path.resolve(__dirname, DIRS.src)
      ],
      exclude: /node_modules/,
      test: /\.js?$/
    }],
    resolve: {
      extensions: ['', '.js']
    }
  }
};

export { webpackBaseConfig, customizer };
