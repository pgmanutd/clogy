/* TDD style with BDD statements */

import common from './common';

// Passing arrow functions to Mocha is discouraged. Their lexical binding of the
// this value makes them unable to access the Mocha context, and statements like
// this.timeout(1000); will not work inside an arrow function.
// https://mochajs.org/#arrow-functions
describe('common', function() {
  describe('isConsoleDefined', function() {
    let consolePreviousState = null;

    beforeEach(function() {
      consolePreviousState = console;
    });

    afterEach(function() {
      console = consolePreviousState;
    });

    it('should return true if console is present', function() {
      console = { log: () => {} };
      expect(common.isConsoleDefined()).to.be.true;
    });

    it('should return false if console is not present', function() {
      console = undefined;
      expect(common.isConsoleDefined()).to.be.false;
    });
  });

  describe('isLogLevelValid', function() {
    it('should return false for blank log level', function() {
      expect(common.isLogLevelValid('')).to.be.false;
    });

    it('should return false for undefined log level', function() {
      expect(common.isLogLevelValid(undefined)).to.be.false;
    });

    it('should return false for null log level', function() {
      expect(common.isLogLevelValid(null)).to.be.false;
    });

    it('should return false if log level is less than min default level', function() {
      expect(common.isLogLevelValid(-1)).to.be.false; // Min: 1
    });

    it('should return false if log level is more than max default level', function() {
      expect(common.isLogLevelValid(8)).to.be.false; // Max: 7
    });

    it('should return true for valid log level', function() {
      expect(common.isLogLevelValid(4)).to.be.true; // Info
    });
  });

  describe('isNoneLogLevel', function() {
    it('should return false if log level is not "None"', function() {
      expect(common.isNoneLogLevel(4)).to.be.false; // Info
    });

    it('should return true for "None" log level', function() {
      expect(common.isNoneLogLevel(7)).to.be.true; // None
    });
  });

  describe('isLoggingAllowed', function() {
    it('should return false if not allowed', function() {
      expect(common.isLoggingAllowed(6, 'info')).to.be.false; // 6: Error
    });

    it('should return true if allowed', function() {
      expect(common.isLoggingAllowed(4, 'info')).to.be.true; // 4: Info
    });
  });

  describe('getDateTime', function() {
    let sandbox = null;

    beforeEach(function() {
      sandbox = sinon.sandbox.create();
    });

    afterEach(function() {
      sandbox.restore();
    });

    it('should return current date and time', function() {
      sandbox.useFakeTimers(new Date(2011, 7, 10).getTime());
      expect(common.getDateTime()).to.equal('Wed Aug 10 2011 00:00:00.000');
    });
  });
});
