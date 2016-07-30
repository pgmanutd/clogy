import Clogy from './main/Clogy';

const clogy = new Clogy();

export default clogy;

// Because of Babel@6
// Can use plugin: https://www.npmjs.com/package/babel-plugin-add-module-exports
// Used this soln. instead:
// http://stackoverflow.com/questions/34736771/webpack-umd-library-return-object-default/34778391#34778391
module.exports = clogy;
