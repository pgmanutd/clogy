import GLOBAL_CONSTANTS from './constants/globalConstants';
import GLOBAL_UTILITIES from './utilities/globalUtilities';

////////////////////////////////////////////////////////////////////////////////
class Loggers {}

GLOBAL_CONSTANTS.methods.forEach((method) => {

  // Not using arrow functions because 'this' will be undefined
  // (Arrow functions capture the this value of the enclosing context)
  Loggers.prototype[method] = function(...args) {
    const logToConsoleParams = {
      currentLogLevel: this.getLevel(),
      loggingType: method,
      options: this.options
    };

    GLOBAL_UTILITIES.logToConsole(logToConsoleParams, args);
  };
});
////////////////////////////////////////////////////////////////////////////////

class Clogy extends Loggers {
  constructor() {
    super();

    this._level = null;
    this.options = {};

    this._init();
  }

  _init() {

    // Set default log level
    this.setLevel(GLOBAL_CONSTANTS.loggingLevels.types.info);

    ({
      showDateTime: this.options.showDateTime,
      prefix: this.options.prefix
    } = GLOBAL_CONSTANTS.options);
  }

  getLevel() {
    return this._level;
  }

  setLevel(logLevel) {
    let _logLevel = logLevel;

    // No need of ===, typeof returns a string
    if (typeof(_logLevel) == 'string') {
      _logLevel = GLOBAL_CONSTANTS.loggingLevels.types[_logLevel.toLowerCase()];
    }

    // No need to check if log level is less or more than min and max or invalid
    // Will be handled when logging
    this._level = _logLevel;
  }

  get LEVELS() {
    return GLOBAL_CONSTANTS.loggingLevels.types;
  }

  enableAllLevels() {
    this.setLevel(GLOBAL_CONSTANTS.loggingLevels.types.log);
  }

  disableAllLevels() {
    this.setLevel(GLOBAL_CONSTANTS.loggingLevels.types.none);
  }

  decorator(decoFunc) {

    // No need of ===, typeof returns a string
    if (typeof(decoFunc) != 'function') {
      throw new TypeError('Decorator handler should be a function');
    }

    decoFunc(GLOBAL_UTILITIES.singelton.getInstance(this));
  }
}

const clogy = new Clogy();

////////////////////////////////////////////////////////////////////////////////
/* clogy Methods only*/

// Not using arrow functions because 'this' will be undefined
// (Arrow functions capture the this value of the enclosing context)
clogy.noConflict = function() {

  // No need of ===, typeof returns a string
  if (typeof(window) != 'undefined' && window.clogy) {

    // it will be deleted because clogy is not a variable, but
    // a property of the global object i.e. window;
    // check yourself ('clogy' in window) -> false after deletion
    delete window.clogy;
  }

  return this;
};
////////////////////////////////////////////////////////////////////////////////

export default clogy;

// Because of Babel@6
// Can use plugin: https://www.npmjs.com/package/babel-plugin-add-module-exports
// Used this soln. instead:
// http://stackoverflow.com/questions/34736771/webpack-umd-library-return-object-default/34778391#34778391
module.exports = clogy;
