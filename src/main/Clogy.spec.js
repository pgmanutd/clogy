import Clogy from './Clogy';
import singleton from '../utilities/singleton';

// Passing arrow functions to Mocha is discouraged. Their lexical binding of the
// this value makes them unable to access the Mocha context, and statements like
// this.timeout(1000); will not work inside an arrow function.
// https://mochajs.org/#arrow-functions
describe('Clogy', function() {
  // Only 1 instance
  const clogy = new Clogy();

  describe('noConflict', function() {
    beforeEach(function() {
      window.clogy = clogy;
    });

    it('should remove clogy instance from window', function() {
      clogy.noConflict();
      expect(window.clogy).to.be.undefined;
    });

    it('should return same instance', function() {
      // No deep comparison required, we just need to check
      // if both points to same memory location
      expect(clogy.noConflict()).to.equal(clogy);
    });
  });

  describe('decorator', function() {
    beforeEach(function() {
      sinon.stub(singleton, 'getInstance');
    });

    afterEach(function() {
      singleton.getInstance.restore();
    });

    it('should throw error if deco func is not a function', function() {
      expect(clogy.decorator).to.throw(TypeError);
    });

    it('should call the deco func with Logger class methods', function() {
      const decoFunc = sinon.spy();
      singleton.getInstance.returns({});

      clogy.decorator(decoFunc);

      expect(decoFunc).to.have.been.calledWith({});
    });
  });
});
