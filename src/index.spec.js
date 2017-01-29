/* TDD style with BDD statements */

import Clogy from './main/Clogy';
import clogy from './index';

// Passing arrow functions to Mocha is discouraged. Their lexical binding of the
// this value makes them unable to access the Mocha context, and statements like
// this.timeout(1000); will not work inside an arrow function.
// https://mochajs.org/#arrow-functions
describe('clogy', function() {
  it('should be an instance of Clogy', function() {
    expect(clogy).to.be.an.instanceof(Clogy);
  });
});
