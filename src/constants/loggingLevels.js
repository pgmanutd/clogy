/* @flow */

export default {
  get types() {
    return {
      log: 1,
      trace: 2,
      debug: 3,
      info: 4,
      warn: 5,
      error: 6,
      none: 7
    };
  },
  get range() {
    return {
      min: this.types.log,
      max: this.types.none
    };
  }
};
