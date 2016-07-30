import singleton from '../utilities/singleton';
import Logger from './Logger';

class Clogy extends Logger {
  noConflict() {

    // No need of ===, typeof returns a string
    if (typeof(window) != 'undefined' && window.clogy) {

      // it will be deleted because clogy is not a variable, but
      // a property of the global object i.e. window;
      // check yourself ('clogy' in window) -> false after deletion
      delete window.clogy;
    }

    return this;
  }

  decorator(decoFunc) {

    // No need of ===, typeof returns a string
    if (typeof(decoFunc) != 'function') {
      throw new TypeError('Decorator handler should be a function');
    }

    decoFunc(singleton.getInstance(this));
  }
}

// JS hoisting will not work with Classes
export default Clogy;
