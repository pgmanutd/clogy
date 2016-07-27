import GLOBAL_UTILITIES from './globalUtilities';

describe('singelton', function() {
  it('should return cached instance of parent', function() {
    const Parent = { foo: 'bar' };
    const Child = function() {};
    Child.prototype = Object.create(Parent);
    Child.prototype.constructor = Child;
    const child = new Child();

    const originalInstance = GLOBAL_UTILITIES.singelton.getInstance(child);
    const cachedInstance = GLOBAL_UTILITIES.singelton.getInstance(child);

    expect(originalInstance).to.equal(cachedInstance);
  });
});

describe('logToConsole', function() {
  let clock;

  beforeEach(function() {
    clock = sinon.useFakeTimers(new Date(2011, 7, 1).getTime());
  });

  afterEach(function() {
    clock.restore();
  });

  it('should throw error for blank log level', function() {
    const logToConsoleParams = {
      currentLogLevel: ''
    };

    expect(GLOBAL_UTILITIES.logToConsole.bind(null, logToConsoleParams)).to.throw(RangeError);
  });

  it('should throw error for undefined log level', function() {
    const logToConsoleParams = {
      currentLogLevel: undefined
    };

    expect(GLOBAL_UTILITIES.logToConsole.bind(null, logToConsoleParams)).to.throw(RangeError);
  });

  it('should throw error for null log level', function() {
    const logToConsoleParams = {
      currentLogLevel: null
    };

    expect(GLOBAL_UTILITIES.logToConsole.bind(null, logToConsoleParams)).to.throw(RangeError);
  });

  it('should throw error if current log level is less than min default level', function() {
    const logToConsoleParams = {
      currentLogLevel: -1 // Min: 1
    };

    expect(GLOBAL_UTILITIES.logToConsole.bind(null, logToConsoleParams)).to.throw(RangeError);
  });

  it('should throw error if current log level is more than max default level', function() {
    const logToConsoleParams = {
      currentLogLevel: 8 // Max: 7
    };

    expect(GLOBAL_UTILITIES.logToConsole.bind(null, logToConsoleParams)).to.throw(RangeError);
  });

  describe('logging', function() {
    beforeEach(function() {
      sinon.stub(console, 'info');
    });

    afterEach(function() {
      console.info.restore();
    });

    it('should not log info message for "none" log level', function() {
      GLOBAL_UTILITIES.logToConsole({
        currentLogLevel: 7, // None
        loggingType: 'info'
      }, ['Hello World', 'Everyone']);

      expect(console.info).to.not.have.been.called;
    });

    it('should log info message', function() {
      GLOBAL_UTILITIES.logToConsole({
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

      GLOBAL_UTILITIES.logToConsole({
        currentLogLevel: 5, // Warn
        loggingType: 'warn'
      }, ['Hello World', 'Everyone']);

      expect(console.log).to.have.been.calledWith('Hello World', 'Everyone');
    });

    it('should log info message with prefix', function() {
      GLOBAL_UTILITIES.logToConsole({
        currentLogLevel: 4, // Info
        loggingType: 'info',
        options: {
          prefix: 'Prashant-'
        }
      }, ['Hello World', 'Everyone']);

      expect(console.info).to.have.been.calledWith('Prashant-', 'Hello World', 'Everyone');
    });

    it('should log info message with date', function() {
      GLOBAL_UTILITIES.logToConsole({
        currentLogLevel: 4, // Info
        loggingType: 'info',
        options: {
          showDateTime: true,
          prefix: 'Prashant-'
        }
      }, ['Hello World', 'Everyone']);

      expect(console.info).to.have.been.calledWith('Mon Aug 01 2011 00:00:00.000:', 'Prashant-', 'Hello World', 'Everyone');
    });
  });
});
