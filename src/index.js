/* @flow */

import Clogy from './main/Clogy';

import type { ClogyType } from './globalFlowTypes';

const clogy: ClogyType = new Clogy();

export default clogy;

// Because of Babel@6
// Can use plugin: https://www.npmjs.com/package/babel-plugin-add-module-exports
// Used this soln. instead:
// http://stackoverflow.com/questions/34736771/webpack-umd-library-return-object-default/34778391#34778391
//
// This is intended behaviour from babel@ to babel@6 to support ES6 import export module system
//
// $FlowFixMe: suppressing this error until babel changes this style
module.exports = clogy;
