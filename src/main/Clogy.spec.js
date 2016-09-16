/* TDD style with BDD statements */

import Clogy from './Clogy';
import singleton from '../utilities/singleton';

// Passing arrow functions to Mocha is discouraged. Their lexical binding of the
// this value makes them unable to access the Mocha context, and statements like
// this.timeout(1000); will not work inside an arrow function.
// https://mochajs.org/#arrow-functions
describe('Clogy', function() {
  let clogy = null;

  beforeEach(function() {
    clogy = new Clogy();
  });

  describe('noConflict', function() {
    it('should remove clogy instance from window', function() {
      window.clogy = clogy;
      clogy.noConflict();
      expect(window.clogy).to.be.undefined;
    });

    it('should return same instance', function() {
      // No deep comparison required, we just need to check
      // if both are same reference
      expect(clogy.noConflict()).to.equal(clogy);
    });
  });

  describe('decorator', function() {
    it('should throw error if deco func is not a function', function() {
      expect(clogy.decorator).to.throw(TypeError, 'Decorator should be a function');
    });

    it('should call the deco func with Logger class methods', function() {
      const decoFunc = sinon.spy();
      const logStub = sinon.spy();

      // Assume { log: () => {} } is logger class methods (in it's prototype)
      sinon.stub(singleton, 'getInstance').returns({
        log: logStub
      }); // no need of restore

      clogy.decorator(decoFunc);

      expect(decoFunc).to.have.been.calledWith({
        log: logStub
      });
    });
  });
});
