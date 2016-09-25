/* @flow */

import common from './common';

const DEFAULT_LOGGING_TYPE: string = 'log';

// I prefer default export rather than named export
export default {
  logToConsole
};

////////////////////////

/**
 * Get console options and push them into an array (for logging)
 * @param  {Object} options: Console options like showDateTime, prefix
 * @return {any[]} Returns an array of console options
 */
function getConsoleOptions(options: Object): any[] {
  const consoleOptions: any[] = [];

  if (options.showDateTime) {

    // Better readability than consoleOptions[consoleOptions.length] = value
    consoleOptions.push(`${common.getDateTime()}: `);
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
 * @param  {
              currentLogLevel: number,
              loggingType: string,
              options: Object
           }        params: Object containing current log level ,
 *                          log methods, default options like prefix
 * @param  {any}    args  : any value
 * @return {void | undefined} Returns nothing
 */
function logToConsole({
    currentLogLevel,
    loggingType,
    options = {} // Avoiding crash, if someone set options to null or undefined
  }: {
    currentLogLevel: number,
    loggingType: string,
    options: Object
  } = {},
  args: any[]
): void {
  if (!common.isConsoleDefined()) {
    return;
  }

  if (!common.isLogLevelValid(currentLogLevel)) {
    throw new RangeError('Invalid LogLevel set, Please set a valid LogLevel');
  }

  if (
    common.isNoneLogLevel(currentLogLevel) ||
    !common.isLoggingAllowed(currentLogLevel, loggingType)
  ) {
    return;
  }

  // Open array's arguments (array spread operator)
  justLogItDude(loggingType, [...getConsoleOptions(options), ...args]);
}
