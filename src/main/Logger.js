/* @flow */

import {
  LOGGING_DEFAULT_OPTIONS,
  LOGGING_LEVELS,
  LOGGING_METHODS
} from '../constants';
import { common, logging } from '../utilities';

import type { LevelsType, ClogyOptionsType } from '../globalFlowTypes';

class Logger {

  /**** Flow's annotation syntax ****/
  _options: ClogyOptionsType;

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
   * @returns {void | undefined} Returns nothing
   */
  _setDefaults(): void {

    // Set default options
    this.setOptions(LOGGING_DEFAULT_OPTIONS);

    // Set default log level
    this.setLevel(this.LEVELS.info); // No need to use LOGGING_LEVELS.types.info again here
  }

  /**
   * Used for returning config options
   * @returns {ClogyOptionsType | null} Returns config options
   */
  getOptions(): ClogyOptionsType {
    return this._options;
  }

  /**
   * Used for setting options (showDateTime and prefix)
   * @param  {ClogyOptionsType} options: Console options like showDateTime, prefix
   * @returns {void | undefined} Returns nothing
   */
  setOptions(options: ClogyOptionsType) {
    this._options = {
      ...this.getOptions(),
      ...options
    };
  }

  /**
   * Used for returning current log level; Default is info
   * @returns {Number | null} Returns current log level
   */
  getLevel(): ? number {
    return this._level;
  }

  /**
   * Used for setting current log level
   * @param  {number | string} level: log level (number or string)
   * @returns {void | undefined} Returns nothing
   * @example:
   * clogy.setLevel(1); // log; number type argument
   * clogy.setLevel(clogy.LEVELS.log); // log; enum type argument
   * clogy.setLevel('log'); // log; string type argument
   */
  setLevel(level: number | string): void {

    // No need to check if log level is less or more than min and max or invalid
    // Will be handled when logging
    this._level = (typeof(level) == 'string') ? // No need of ===, typeof returns a string
      this.LEVELS[level.toLowerCase()] :
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
   * @returns {LevelsType} Returns all log levels
   */
  get LEVELS(): LevelsType {
    return LOGGING_LEVELS.types;
  }

  /**
   * Get stringifed allowed loggers (Order goes from top to bottom). Use utf-8 encoding for showing tick and cross marks, if not visible.
   * @returns {String} Returns stringifed allowed loggers
   * @example:
   * clogy.stringifyAllowedLoggers(); // When current log level is info
   * =>  1: log ✖
   *     2: trace ✖
   *     3: debug ✖
   *     4: info ✔
   *     5: warn ✔
   *     6: error ✔
   */
  stringifyAllowedLoggers(): string {
    const tickMark: string = '\u2714';
    const crossMark: string = '\u2716';

    return LOGGING_METHODS.map((loggingType: string, index: number) =>
      `${(index + 1)}: ${loggingType} ${common.isLoggingAllowed(this.getLevel(), loggingType) ? tickMark: crossMark}`
    ).join('\n');
  }

  /**
   * Enable all levels; equivalent to 'clogy.setLevel(clogy.LEVELS.log)''
   * @returns {void | undefined} Returns nothing
   */
  enableAllLevels(): void {
    this.setLevel(this.LEVELS.log);
  }

  /**
   * Disable all levels; equivalent to 'clogy.setLevel(clogy.LEVELS.none)''
   * @returns {void | undefined} Returns nothing
   */
  disableAllLevels(): void {
    this.setLevel(this.LEVELS.none);
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
 * @returns {void | undefined} Returns nothing
 */
LOGGING_METHODS.forEach((method: string) => {

  // Not using arrow functions because 'this' will be undefined
  // (Arrow functions capture the this value of the enclosing context)
  loggerPrototype[method] = function(...args: any[]) {
    const logToConsoleParams: {
      currentLogLevel: number,
      loggingType: string,
      options: ClogyOptionsType
    } = {
      currentLogLevel: this.getLevel(),
      loggingType: method,
      options: this.getOptions()
    };

    logging.logToConsole(logToConsoleParams, args);
  };
});

////////////////////////

// JS hoisting will not work with Classes
export default Logger;
