'use strict';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { customizer, MODULE_NAME } from './webpack.config.base.babel';
import webpackDevConfig from './webpack.config.dev.babel';
import * as fp from 'lodash/fp';

const webpackDevWatchConfig = fp.mergeWith(customizer, {
  entry: {
    [MODULE_NAME]: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
    ]
  },
  output: {
    publicPath: '/'
  },
  watch: true, // cache: true in watch mode, helpful in incremental builds
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.OldWatchingPlugin(), // Temp. solution for windows
    new HtmlWebpackPlugin({
      title: MODULE_NAME,
      template: 'public/views/index.ejs'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}, webpackDevConfig);

const compiler = webpack(webpackDevWatchConfig);

export default (app) => {
  app.use(webpackDevMiddleware(compiler, {
    dynamicPublicPath: true,
    stats: {
      colors: true,
      chunks: false,
      'errors-only': true
    }
  }));

  app.use(webpackHotMiddleware(compiler));
};
