import GLOBAL_CONSTANTS from './globalConstants';

describe('globalConstants', function() {
  it('should get global constants', function() {
    expect(GLOBAL_CONSTANTS).to.eql({
      loggingLevels: {
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
      },
      options: {
        showDateTime: false,
        prefix: ''
      },
      methods: ['log', 'trace', 'debug', 'info', 'warn', 'error']
    });
  });
});
