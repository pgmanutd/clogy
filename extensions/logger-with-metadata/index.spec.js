/* TDD style with BDD statements */

import LoggerWithMetadata from './index';
import clogy from '../../lib/clogy.js';

// Passing arrow functions to Mocha is discouraged. Their lexical binding of the
// this value makes them unable to access the Mocha context, and statements like
// this.timeout(1000); will not work inside an arrow function.
// https://mochajs.org/#arrow-functions
describe('loggerWithMetadata', function() {
  let sandbox;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('should call clogs info method with the given metadata', function() {
    sandbox.stub(clogy, 'info');

    const loggerWithMetadata = LoggerWithMetadata({ file: 'somefile.js' });

    loggerWithMetadata.info('Hello World', 'Everyone');

    expect(clogy.info).to.have.been.calledWith('[INFO] [file:somefile.js]', 'Hello World', 'Everyone');
  });
});
