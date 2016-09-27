'use strict';

import { webpackModule, resolve } from './webpack.config.base.babel';

export default {
  devtool: 'inline-source-map',
  module: webpackModule,
  resolve
};
