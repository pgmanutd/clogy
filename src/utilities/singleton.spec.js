/* TDD style with BDD statements */

import singleton from './singleton';

// Passing arrow functions to Mocha is discouraged. Their lexical binding of the
// this value makes them unable to access the Mocha context, and statements like
// this.timeout(1000); will not work inside an arrow function.
// https://mochajs.org/#arrow-functions
describe('getInstance', function() {
  let originalInstance;
  let cachedInstance;

  before(function() {
    const Parent = { foo: 'bar' };
    const Child = () => {};
    Child.prototype = Object.create(Parent);
    Child.prototype.constructor = Child;
    const child = new Child();

    originalInstance = singleton.getInstance(child);
    cachedInstance = singleton.getInstance(child);
  });

  it('should return parent instance', function() {
    expect(cachedInstance).to.eql({ foo: 'bar' });
  });

  it('should return cached instance of parent', function() {
    // Just compare the same reference
    expect(originalInstance).to.equal(cachedInstance);
  });
});
