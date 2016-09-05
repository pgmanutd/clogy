/* @flow */

import LOGGING_LEVELS from '../constants/loggingLevels';
import LOGGING_DEFAULT_OPTIONS from '../constants/loggingDefaultOptions';
import LOGGING_METHODS from '../constants/loggingMethods';
import logging from '../utilities/logging';

import type { LevelsType } from '../globalFlowTypes';

class Logger {

  /**** Flow's annotation syntax ****/
  _level: ? number;
  options: {
    showDateTime: ? boolean,
    prefix: ? string
  };
  /***********************************/

  constructor() {
    this._level = null;

    // Avoiding Object reshaping
    this.options = {
      showDateTime: null,
      prefix: null
    };

    this._setDefaults();
  }

  /**
   * Setting default options like prefix, showDateTime
   * @return {void | undefined} Returns nothing
   */
  _setDefaults(): void {

    // Set default log level
    this.setLevel(LOGGING_LEVELS.types.info);

    ({
      // $FlowIssue: suppressing this error until this destructing supported by flow
      showDateTime: this.options.showDateTime,

      // $FlowIssue: suppressing this error until this destructing supported by flow
      prefix: this.options.prefix

    } = LOGGING_DEFAULT_OPTIONS);
  }

  /**
   * Used for returning current log level; Default is info
   * @return {Number | null} Returns current log level
   */
  getLevel(): ? number {
    return this._level;
  }

  /**
   * Used for setting current log level
   * @param  {number | string} logLevel: log level (number or string)
   * @return {void | undefined} Returns nothing
   * @example:
   * clogy.setLevel(1); // log; number type argument
   * clogy.setLevel(clogy.LEVELS.log); // log; enum type argument
   * clogy.setLevel('log'); // log; string type argument
   */
  setLevel(logLevel: number | string): void {
    let _logLevel: number | string = logLevel;

    // No need of ===, typeof returns a string
    if (typeof(_logLevel) == 'string') {
      _logLevel = LOGGING_LEVELS.types[_logLevel.toLowerCase()];
    }

    // No need to check if log level is less or more than min and max or invalid
    // Will be handled when logging
    this._level = _logLevel;
  }

  /**
   * Different log levels (along with values); use them to set current log level
   *  1. 'log': 1
   *  2. 'trace': 2
   *  3. 'debug': 3
   *  4. 'info': 4
   *  5. 'warn': 5
   *  6. 'error': 6
   *  7. 'none': 7 (if current level is none, it won't log anything)
   *
   * If current log level is 'info', then all the levels below 'info' are valid
   * and rest are invalid. It means ' clogy.info()', 'clogy.warn()' and
   * 'clogy.error()' will work but 'clogy.log()', 'clogy.trace()' and
   * 'clogy.debug()' won't
   * @return {LevelsType} Returns all log levels
   */
  get LEVELS(): LevelsType {
    return LOGGING_LEVELS.types;
  }

  /**
   * Enable all levels; equivalent to 'clogy.setLevel(clogy.LEVELS.log)''
   * @return {void | undefined} Returns nothing
   */
  enableAllLevels(): void {
    this.setLevel(LOGGING_LEVELS.types.log);
  }

  /**
   * Disable all levels; equivalent to 'clogy.setLevel(clogy.LEVELS.none)''
   * @return {void | undefined} Returns nothing
   */
  disableAllLevels(): void {
    this.setLevel(LOGGING_LEVELS.types.none);
  }
}

////////////////////////

const loggerPrototype: Object = Logger.prototype;

/**
 * Logging methods such as log, info, error, warn etc. Used
 * for logging to console
 * @return {void | undefined} Returns nothing
 */
LOGGING_METHODS.forEach((method: string) => {

  // Not using arrow functions because 'this' will be undefined
  // (Arrow functions capture the this value of the enclosing context)
  loggerPrototype[method] = function(...args) {
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
