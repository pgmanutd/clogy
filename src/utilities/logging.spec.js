/* TDD style with BDD statements */

import logging from './logging';

// Passing arrow functions to Mocha is discouraged. Their lexical binding of the
// this value makes them unable to access the Mocha context, and statements like
// this.timeout(1000); will not work inside an arrow function.
// https://mochajs.org/#arrow-functions
describe('logToConsole', function() {
  let clock;

  beforeEach(function() {
    clock = sinon.useFakeTimers(new Date(2011, 7, 10).getTime());
  });

  afterEach(function() {
    clock.restore();
  });

  // Test Case for undefined console if in "logging" describe block
  it('should throw error for blank log level', function() {
    const logToConsoleParams = {
      currentLogLevel: ''
    };

    expect(logging.logToConsole.bind(null, logToConsoleParams)).to.throw(RangeError);
  });

  it('should throw error for undefined log level', function() {
    const logToConsoleParams = {
      currentLogLevel: undefined
    };

    expect(logging.logToConsole.bind(null, logToConsoleParams)).to.throw(RangeError);
  });

  it('should throw error for null log level', function() {
    const logToConsoleParams = {
      currentLogLevel: null
    };

    expect(logging.logToConsole.bind(null, logToConsoleParams)).to.throw(RangeError);
  });

  it('should throw error if current log level is less than min default level', function() {
    const logToConsoleParams = {
      currentLogLevel: -1 // Min: 1
    };

    expect(logging.logToConsole.bind(null, logToConsoleParams)).to.throw(RangeError);
  });

  it('should throw error if current log level is more than max default level', function() {
    const logToConsoleParams = {
      currentLogLevel: 8 // Max: 7
    };

    expect(logging.logToConsole.bind(null, logToConsoleParams)).to.throw(RangeError);
  });

  describe('logging', function() {
    beforeEach(function() {
      sinon.stub(console, 'info');
    });

    afterEach(function() {
      console.info.restore();
    });

    it('should not log info message if console is not available', function() {
      const consolePreviousState = console;
      console = undefined;

      logging.logToConsole();

      console = consolePreviousState;

      expect(console.info).to.not.have.been.called;
    });

    it('should not log info message for "none" log level', function() {
      logging.logToConsole({
        currentLogLevel: 7, // None
        loggingType: 'info'
      }, ['Hello World', 'Everyone']);

      expect(console.info).to.not.have.been.called;
    });

    it('should not log info message if not allowed', function() {
      logging.logToConsole({
        currentLogLevel: 6, // Error
        loggingType: 'info'
      }, ['Hello World', 'Everyone']);

      expect(console.info).to.not.have.been.called;
    });

    it('should not log info message if methods are not available', function() {
      const consolePreviousState = console;
      console = {};

      logging.logToConsole({
        currentLogLevel: 4, // Info
        loggingType: 'info'
      }, ['Hello World', 'Everyone']);

      console = consolePreviousState;

      expect(console.info).to.not.have.been.called;
    });

    it('should log info message', function() {
      logging.logToConsole({
        currentLogLevel: 4, // Info
        loggingType: 'info'
      }, ['Hello World', 'Everyone']);

      expect(console.info).to.have.been.calledWith('Hello World', 'Everyone');
    });

    it('should log info message with default logging type i.e. "log"', function() {
      // Suppose warn is not available eg in IE9, fallback to log
      // No need to restore warn as we are not using it again any where
      console.warn = undefined;
      sinon.stub(console, 'log');

      logging.logToConsole({
        currentLogLevel: 5, // Warn
        loggingType: 'warn'
      }, ['Hello World', 'Everyone']);

      expect(console.log).to.have.been.calledWith('Hello World', 'Everyone');
    });

    it('should log info message with prefix', function() {
      logging.logToConsole({
        currentLogLevel: 4, // Info
        loggingType: 'info',
        options: {
          prefix: 'Prashant-'
        }
      }, ['Hello World', 'Everyone']);

      expect(console.info).to.have.been.calledWith('Prashant-', 'Hello World', 'Everyone');
    });

    it('should log info message with date', function() {
      logging.logToConsole({
        currentLogLevel: 4, // Info
        loggingType: 'info',
        options: {
          showDateTime: true,
          prefix: 'Prashant-'
        }
      }, ['Hello World', 'Everyone']);

      expect(console.info).to.have.been.calledWith('Wed Aug 10 2011 00:00:00.000: ', 'Prashant-', 'Hello World', 'Everyone');
    });
  });
});
