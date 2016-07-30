import LOGGING_LEVELS from '../constants/loggingLevels';
import LOGGING_DEFAULT_OPTIONS from '../constants/loggingDefaultOptions';
import LOGGING_METHODS from '../constants/loggingMethods';
import logging from '../utilities/logging';

class Logger {
  constructor() {
    this._level = null;
    this.options = {};

    this._init();
  }

  _init() {

    // Set default log level
    this.setLevel(LOGGING_LEVELS.types.info);

    ({
      showDateTime: this.options.showDateTime,
      prefix: this.options.prefix
    } = LOGGING_DEFAULT_OPTIONS);
  }

  getLevel() {
    return this._level;
  }

  setLevel(logLevel) {
    let _logLevel = logLevel;

    // No need of ===, typeof returns a string
    if (typeof(_logLevel) == 'string') {
      _logLevel = LOGGING_LEVELS.types[_logLevel.toLowerCase()];
    }

    // No need to check if log level is less or more than min and max or invalid
    // Will be handled when logging
    this._level = _logLevel;
  }

  get LEVELS() {
    return LOGGING_LEVELS.types;
  }

  enableAllLevels() {
    this.setLevel(LOGGING_LEVELS.types.log);
  }

  disableAllLevels() {
    this.setLevel(LOGGING_LEVELS.types.none);
  }
}

////////////////////////

LOGGING_METHODS.forEach((method) => {

  // Not using arrow functions because 'this' will be undefined
  // (Arrow functions capture the this value of the enclosing context)
  Logger.prototype[method] = function(...args) {
    const logToConsoleParams = {
      currentLogLevel: this.getLevel(),
      loggingType: method,
      options: this.options
    };

    logging.logToConsole(logToConsoleParams, args);
  };
});

////////////////////////

// JS hoisting will not work with Classes
export default Logger;
