'use strict';

import webpack from 'webpack';
import { webpackBaseConfig, customizer } from './webpack.config.base.babel';
import _ from 'lodash';

export default _.mergeWith({
  output: {
    filename: '[name].js'
  },
  watch: true, //cache: true in watch mode, helpful in incremental builds
  debug: true,
  devtool: '#cheap-module-source-map',
  plugins: [
    new webpack.OldWatchingPlugin() // Temp. solution for windows
  ]
}, webpackBaseConfig, customizer);
