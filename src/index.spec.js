import clogy from './index';
import GLOBAL_CONSTANTS from './constants/globalConstants';
import GLOBAL_UTILITIES from './utilities/globalUtilities';

// Passing arrow functions to Mocha is discouraged. Their lexical binding of the
// this value makes them unable to access the Mocha context, and statements like
// this.timeout(1000); will not work inside an arrow function.
// https://mochajs.org/#arrow-functions
describe('clogy', function() {
  describe('constructor', function() {
    it('should initialize default log level', function() {
      expect(clogy.getLevel()).to.equal(4); // Info
    });

    it('should initialize default log options', function() {
      expect(clogy.options).to.eql({
        showDateTime: false,
        prefix: ''
      });
    });
  });

  describe('get set log level', function() {
    it('should get log level for number type input', function() {
      clogy.setLevel(3); // Debug
      expect(clogy.getLevel()).to.equal(3); // Debug
    });

    it('should get log level for string type input', function() {
      clogy.setLevel('dEbUg'); // Debug
      expect(clogy.getLevel()).to.equal(3); // Debug
    });

    afterEach(function() {
      // Resetting the log level
      clogy.setLevel(clogy.LEVELS.info);
    });
  });


  describe('LEVELS', function() {
    it('should get log levels', function() {
      expect(clogy.LEVELS).to.eql({
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
      sinon.stub(clogy, 'setLevel');
    });

    afterEach(function() {
      clogy.setLevel.restore();
    });

    it('should enable all the levels', function() {
      clogy.enableAllLevels();
      expect(clogy.setLevel).to.have.been.calledWith(1); // Log
    });

    it('should disable all the levels', function() {
      clogy.disableAllLevels();
      expect(clogy.setLevel).to.have.been.calledWith(7); // None
    });
  });

  describe('decorator', function() {
    beforeEach(function() {
      sinon.stub(GLOBAL_UTILITIES.singelton, 'getInstance');
    });

    afterEach(function() {
      GLOBAL_UTILITIES.singelton.getInstance.restore();
    });

    it('should throw error if deco func is not a function', function() {
      expect(clogy.decorator).to.throw(TypeError);
    });

    it('should call the deco func with Logger class methods', function() {
      const decoFunc = sinon.spy();
      GLOBAL_UTILITIES.singelton.getInstance.returns({});

      clogy.decorator(decoFunc);

      expect(decoFunc).to.have.been.calledWith({});
    });
  });

  describe('noConflict', function() {
    beforeEach(function() {
      window.clogy = clogy;
    });

    it('should remove clogy instance from window', function() {
      clogy.noConflict();
      expect(window.clogy).to.be.undefined;
    });

    it('should return same instance', function() {
      // No deep comparing required, we just need to check
      // if both points to same memory location
      expect(clogy.noConflict()).to.equal(clogy);
    });
  });

  describe('logging', function() {
    beforeEach(function() {
      sinon.stub(GLOBAL_UTILITIES, 'logToConsole');
    });

    afterEach(function() {
      GLOBAL_UTILITIES.logToConsole.restore();
    });

    GLOBAL_CONSTANTS.methods.forEach((method) => {
      it(`should log the "${method}" message`, function() {
        clogy[method]('Hello World', 'Everyone');

        expect(GLOBAL_UTILITIES.logToConsole).to.have.been.calledWith({
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
