'use strict';

import webpack from 'webpack';
import { webpackBaseConfig, customizer } from './webpack.config.base.babel';
import _ from 'lodash';

export default _.mergeWith({
  output: {
    filename: '[name].min.js'
  },
  devtool: '#source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false // mangle: true by default, mangle.props should be false (default)
      } // Property mangling might break source code
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    })
  ]
}, webpackBaseConfig, customizer);
