import LOGGING_DEFAULT_OPTIONS from './loggingDefaultOptions';

// Passing arrow functions to Mocha is discouraged. Their lexical binding of the
// this value makes them unable to access the Mocha context, and statements like
// this.timeout(1000); will not work inside an arrow function.
// https://mochajs.org/#arrow-functions
describe('loggingDefaultOptions', function() {
  it('should get logging default options', function() {
    expect(LOGGING_DEFAULT_OPTIONS).to.eql({
      showDateTime: false,
      prefix: ''
    });
  });
});
