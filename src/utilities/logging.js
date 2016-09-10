/* @flow */

import LOGGING_LEVELS from '../constants/loggingLevels';

const DEFAULT_LOGGING_TYPE: string = 'log';

// I prefer default export rather than named export
export default {
  logToConsole
};

////////////////////////

/**
 * Check if console is available or not
 * @return {Boolean} Returns true or false
 */
function isConsoleDefined(): boolean {

  // No need of ===, typeof returns a string
  return typeof(console) != 'undefined';
}

/**
 * Check if current log level is valid, less than max
 * and more than min log level
 * @param  {Number}  currentLogLevel: Current log level eg. 1, 2, 3, 4
 * @return {Boolean} Returns true or false
 */
function isLogLevelValid(currentLogLevel: number): boolean {
  return !!(
    currentLogLevel &&
    currentLogLevel >= LOGGING_LEVELS.range.min &&
    currentLogLevel <= LOGGING_LEVELS.range.max
  );
}

/**
 * Check if current log level is none thus logging is disabled
 * @param  {Number}  currentLogLevel: Current log level eg. 1, 2, 3, 4
 * @return {Boolean} Returns true or false
 */
function isNoneLogLevel(currentLogLevel: number): boolean {
  return currentLogLevel === LOGGING_LEVELS.types.none;
}

/**
 * Check if current log level is more than level of current log method, thus
 * allowing logging accordingly
 * @param  {Number}  currentLogLevel: Current log level eg. 1, 2, 3, 4
 * @param  {String}  loggingType    : logging method eg. log, info, error, warn
 * @return {Boolean} Returns true or false
 */
function isLoggingAllowed(
  currentLogLevel: number,
  loggingType: string
): boolean {
  return (
    LOGGING_LEVELS.types[loggingType] >= currentLogLevel
  );
}

/**
 * Get current date and time
 * @return {String} Returns date and time in string format
 */
function getDateTime(): string {
  const d: Object = new Date();
  const date: string = d.toDateString();

  // 0 means first matched string, which will be true always unless someone
  // overrides the result
  const time: string = d.toTimeString().match(/^([0-9]{2}:[0-9]{2}:[0-9]{2})/)[0];

  // NOTE: hey..!! see, 3 is not a magic number, if you think it is, then
  // it's just milliseconds in 3 digits (000-999)
  const appendMilliseconds: string = `00${d.getMilliseconds()}`.slice(-3);

  return `${date} ${time}.${appendMilliseconds}`;
}

/**
 * Get console options and push them into an array (for logging)
 * @param  {Object} options: Console options like showDateTime, prefix
 * @return {any[]} Returns an array of console options
 */
function getConsoleOptions(options: Object): any[] {
  const consoleOptions: any[] = [];

  if (options.showDateTime) {

    // Better readability than consoleOptions[consoleOptions.length] = value
    consoleOptions.push(`${getDateTime()}: `);
  }

  if (options.prefix) {
    consoleOptions.push(options.prefix);
  }

  return consoleOptions;
}

/**
 * Used for logging to console
 * @param  {String} loggingType: logging method eg. log, info, error, warn
 * @param  {any}    args       : any value
 * @return {void | undefined} Returns nothing
 */
function justLogItDude(loggingType: string, args: any[]): void {
  const consoleLoggingType: () => void = console[loggingType] || console[DEFAULT_LOGGING_TYPE];

  // I know this should be returned earlier but there is
  // negligible performance hit.
  // May be I can move this to a function which can return me
  // consoleLoggingType or false (maintain S of SOLID),
  // but I prefer this to be here
  if (!consoleLoggingType) {
    return;
  }

  // The console object is not part of any standard and is an extension to the
  // Document Object Model. Like other DOM objects, it is considered a host
  // object and is not required to inherit from Object, nor its methods from
  // Function, like native ECMAScript functions and objects do. This is the
  // reason apply and call are undefined on those methods. In IE9, most DOM
  // objects were improved to inherit from native ECMAScript types. As the
  // developer tools are considered an extension to IE
  // (albeit, a built-in extension), they clearly didn't receive the same
  // improvements as the rest of the DOM.
  // For what it's worth, you can still use some Function.prototype methods
  // on console methods with a little bind() magic
  Function.prototype.bind.call(consoleLoggingType, console).apply(console, args);
}

/**
 * Used for logging to console
 * Functional style programming; No mutating params, no state known beforehand
 * @param  {Object} params: Object containing current log level ,
 *                          log methods, default options like prefix
 * @param  {any}    args  : any value
 * @return {void | undefined} Returns nothing
 */
function logToConsole(params: Object, args: any[]): void {
  if (!isConsoleDefined()) {
    return;
  }

  const {
    currentLogLevel,
    loggingType,
    options = {} // Avoiding crash, if someone set options to null or undefined
  }: {
    currentLogLevel: number,
    loggingType: string,
    options: Object
  } = params;

  if (!isLogLevelValid(currentLogLevel)) {
    throw new RangeError('Invalid LogLevel set, Please set a valid LogLevel');
  }

  if (
    isNoneLogLevel(currentLogLevel) ||
    !isLoggingAllowed(currentLogLevel, loggingType)
  ) {
    return;
  }

  // Open array's arguments (array spread operator)
  justLogItDude(loggingType, [...getConsoleOptions(options), ...args]);
}
