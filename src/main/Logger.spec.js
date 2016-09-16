/* TDD style with BDD statements */

import Logger from './Logger';
import LOGGING_METHODS from '../constants/loggingMethods';
import logging from '../utilities/logging';

// Passing arrow functions to Mocha is discouraged. Their lexical binding of the
// this value makes them unable to access the Mocha context, and statements like
// this.timeout(1000); will not work inside an arrow function.
// https://mochajs.org/#arrow-functions
describe('Logger', function() {
  let logger = null;
  let sandbox;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    logger = new Logger();
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('constructor', function() {
    it('should initialize default log options', function() {
      // I know _options is private, but there is no getOptions()
      // and we don't need one
      expect(logger._options).to.eql({
        showDateTime: false,
        prefix: ''
      });
    });

    it('should initialize default log level', function() {
      expect(logger.getLevel()).to.equal(4); // Info
    });
  });

  describe('set options', function() {
    it('should set out of the box options', function() {
      logger.setOptions({
        showDateTime: true,
        prefix: 'Prashant'
      });

      // I know _options is private, but there is no getOptions()
      // and we don't need one
      expect(logger._options).to.eql({
        showDateTime: true,
        prefix: 'Prashant'
      });
    });
  });

  describe('get set log level', function() {
    it('should get "debug" log level for number type input', function() {
      logger.setLevel(3); // Debug
      expect(logger.getLevel()).to.equal(3); // Debug
    });

    it('should get "error" log level for string type input', function() {
      logger.setLevel('eRrOr'); // Error
      expect(logger.getLevel()).to.equal(6); // Error
    });

    it('should get "warn" log level for enum type input', function() {
      logger.setLevel(logger.LEVELS.warn); // warn
      expect(logger.getLevel()).to.equal(5); // warn
    });
  });

  describe('LEVELS', function() {
    it('should get log levels', function() {
      expect(logger.LEVELS).to.eql({
        log: 1,
        trace: 2,
        debug: 3,
        info: 4,
        warn: 5,
        error: 6,
        none: 7
      });
    });
  });

  describe('enable disable all Levels', function() {
    beforeEach(function() {
      sandbox.spy(logger, 'setLevel');
    });

    it('should enable all the levels', function() {
      logger.enableAllLevels();
      expect(logger.setLevel).to.have.been.calledWith(1); // Log
    });

    it('should disable all the levels', function() {
      logger.disableAllLevels();
      expect(logger.setLevel).to.have.been.calledWith(7); // None
    });
  });

  describe('logging methods', function() {
    before(function() {
      sandbox.stub(logging, 'logToConsole');
    });

    LOGGING_METHODS.forEach((method) => {
      it(`should log the "${method}" message`, function() {
        logger[method]('Hello World', 'Everyone');

        expect(logging.logToConsole).to.have.been.calledWith({
          currentLogLevel: 4, // Info
          loggingType: method,
          options: {
            showDateTime: false,
            prefix: ''
          }
        }, ['Hello World', 'Everyone']);
      });
    });
  });
});
