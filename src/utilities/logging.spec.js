/* TDD style with BDD statements */

import logging from './logging';
import common from './common';

// Passing arrow functions to Mocha is discouraged. Their lexical binding of the
// this value makes them unable to access the Mocha context, and statements like
// this.timeout(1000); will not work inside an arrow function.
// https://mochajs.org/#arrow-functions
describe('logging', function() {
  describe('logToConsole', function() {
    let sandbox;

    beforeEach(function() {
      sandbox = sinon.sandbox.create();
      sandbox.stub(common, 'isConsoleDefined');
      sandbox.stub(common, 'isLogLevelValid');
      sandbox.stub(common, 'isNoneLogLevel');
      sandbox.stub(common, 'isLoggingAllowed');
    });

    afterEach(function() {
      sandbox.restore();
    });

    it('should check for valid console object', function() {
      logging.logToConsole();
      expect(common.isConsoleDefined).to.have.been.called;
    });

    it('should check for valid log level', function() {
      const logToConsoleParams = {
        currentLogLevel: 4 // Info
      };

      common.isConsoleDefined.returns(true);
      common.isLogLevelValid.returns(true);

      logging.logToConsole(logToConsoleParams);

      expect(common.isLogLevelValid).to.have.been.calledWith(4); // Info
    });

    it('should throw error for invalid log level', function() {
      const logToConsoleParams = {
        currentLogLevel: 4 // Info
      };

      common.isConsoleDefined.returns(true);
      common.isLogLevelValid.returns(false);

      expect(logging.logToConsole.bind(null, logToConsoleParams)).to.throw(RangeError, 'Invalid LogLevel set, Please set a valid LogLevel');
    });

    it('should check for "None" log level', function() {
      const logToConsoleParams = {
        currentLogLevel: 4 // Info
      };

      common.isConsoleDefined.returns(true);
      common.isLogLevelValid.returns(true);

      logging.logToConsole(logToConsoleParams);

      expect(common.isNoneLogLevel).to.have.been.calledWith(4); // Info
    });

    it('should check if logging is allowed or not', function() {
      const logToConsoleParams = {
        currentLogLevel: 4, // Info
        loggingType: 'info'
      };

      common.isConsoleDefined.returns(true);
      common.isLogLevelValid.returns(true);
      common.isNoneLogLevel.returns(false);

      logging.logToConsole(logToConsoleParams);

      expect(common.isLoggingAllowed).to.have.been.calledWith(4, 'info'); // Info
    });

    describe('logging now', function() {
      beforeEach(function() {
        common.isConsoleDefined.returns(true);
        common.isLogLevelValid.returns(true);
        common.isNoneLogLevel.returns(false);
        common.isLoggingAllowed.returns(true);
        sandbox.stub(console, 'info');
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
        sandbox.stub(console, 'log');

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
        sandbox.stub(common, 'getDateTime').returns('Wed Aug 10 2011 00:00:00.000');

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
});
