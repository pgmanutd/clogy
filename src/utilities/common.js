import LOGGING_LEVELS from '../constants/loggingLevels';

// I prefer default export rather than named export
export default {
  isConsoleDefined,
  isLogLevelValid,
  isNoneLogLevel,
  isLoggingAllowed,
  getDateTime
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
 * @param  {Number}  logLevel: Current log level eg. 1, 2, 3, 4
 * @return {Boolean} Returns true or false
 */
function isLogLevelValid(logLevel: number): boolean {
  return !!(
    logLevel &&
    logLevel >= LOGGING_LEVELS.range.min &&
    logLevel <= LOGGING_LEVELS.range.max
  );
}

/**
 * Check if current log level is none thus logging is disabled
 * @param  {Number}  logLevel: Current log level eg. 1, 2, 3, 4
 * @return {Boolean} Returns true or false
 */
function isNoneLogLevel(logLevel: number): boolean {
  return logLevel === LOGGING_LEVELS.types.none;
}

/**
 * Check if level of passed log method is more than (or equal to) the
 * current log level, thus allowing logging accordingly
 * @param  {Number}  logLevel: Current log level eg. 1, 2, 3, 4
 * @param  {String}  loggingType    : logging method eg. log, info, error, warn
 * @return {Boolean} Returns true or false
 */
function isLoggingAllowed(
  logLevel: number,
  loggingType: string
): boolean {
  return (
    LOGGING_LEVELS.types[loggingType] >= logLevel
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
