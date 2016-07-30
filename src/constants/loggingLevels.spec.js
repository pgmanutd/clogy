import LOGGING_LEVELS from './loggingLevels';

// Passing arrow functions to Mocha is discouraged. Their lexical binding of the
// this value makes them unable to access the Mocha context, and statements like
// this.timeout(1000); will not work inside an arrow function.
// https://mochajs.org/#arrow-functions
describe('loggingLevels', function() {
  it('should get logging levels', function() {
    expect(LOGGING_LEVELS).to.eql({
      types: {
        log: 1,
        trace: 2,
        debug: 3,
        info: 4,
        warn: 5,
        error: 6,
        none: 7
      },
      range: {
        min: 1,
        max: 7
      }
    });
  });
});
