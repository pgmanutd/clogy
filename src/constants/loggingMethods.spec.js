import LOGGING_METHODS from './loggingMethods';

// Passing arrow functions to Mocha is discouraged. Their lexical binding of the
// this value makes them unable to access the Mocha context, and statements like
// this.timeout(1000); will not work inside an arrow function.
// https://mochajs.org/#arrow-functions
describe('loggingMethods', function() {
  it('should get logging methods', function() {
    expect(LOGGING_METHODS).to.eql(['log', 'trace', 'debug', 'info', 'warn', 'error']);
  });
});
