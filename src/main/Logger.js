/* @flow */

import LOGGING_DEFAULT_OPTIONS from '../constants/loggingDefaultOptions';
import LOGGING_LEVELS from '../constants/loggingLevels';
import LOGGING_METHODS from '../constants/loggingMethods';
import logging from '../utilities/logging';

import type { LevelsType } from '../globalFlowTypes';

class Logger {

  /**** Flow's annotation syntax ****/
  _options: {
    showDateTime: ? boolean,
    prefix: ? string
  };
  _level: ? number;
  /***********************************/

  constructor() {
    // See it's better to keep these two in state rather than creating a
    // local variable for them. This way we can keep OOP style along with
    // functional style programming

    // Avoiding Object reshaping
    this._options = {
      showDateTime: null,
      prefix: null
    };

    this._level = null;

    this._setDefaults();
  }

  /**
   * Setting default options like prefix, showDateTime, log level
   * @return {void | undefined} Returns nothing
   */
  _setDefaults(): void {

    // Set default options
    this.setOptions(LOGGING_DEFAULT_OPTIONS);

    // Set default log level
    this.setLevel(LOGGING_LEVELS.types.info);
  }

  /**
   * getOptions() not required
   *
   * Used for setting options (showDateTime and prefix)
   * @return {void | undefined} Returns nothing
   */
  setOptions(options: Object) {
    this._options = {
      ...this._options,
      ...options
    };
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
   * @param  {number | string} level: log level (number or string)
   * @return {void | undefined} Returns nothing
   * @example:
   * clogy.setLevel(1); // log; number type argument
   * clogy.setLevel(clogy.LEVELS.log); // log; enum type argument
   * clogy.setLevel('log'); // log; string type argument
   */
  setLevel(level: number | string): void {

    // No need to check if log level is less or more than min and max or invalid
    // Will be handled when logging
    this._level = (typeof(level) == 'string') ? // No need of ===, typeof returns a string
      LOGGING_LEVELS.types[level.toLowerCase()] :
      level;
  }

  /**
   * I know this should be static, but I am exposing instance instead of class
   * If LEVELS are static, may be we can do clogy.__proto__.constructor.LEVELS
   * or Object.getPrototypeOf(clogy).constructor.LEVELS, but that's not a good
   * way to access static property
   *
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

// Cached prototype once
const loggerPrototype: Object = Logger.prototype;

/**
 * Array.ForEach is slower than for() in for each for Arrays in JavaScript;
 * but negligible performance hit here (small loop).
 * We are also maintaining functional style programming here
 *
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
      options: this._options
    };

    logging.logToConsole(logToConsoleParams, args);
  };
});

////////////////////////

// JS hoisting will not work with Classes
export default Logger;
