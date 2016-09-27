'use strict';

import webpack from 'webpack';
import { webpackBaseConfig, customizer } from './webpack.config.base.babel';
import pkg from './package';
import _ from 'lodash';

export default _.mergeWith({
  output: {
    filename: '[name].js'
  },
  watch: false, // cache: true in watch mode, helpful in incremental builds
  debug: true,
  devtool: '#cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(pkg.config.env.dev)
      }
    })
  ]
}, webpackBaseConfig, customizer);
