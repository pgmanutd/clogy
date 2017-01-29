/* @flow */

import { singleton } from '../utilities';
import Logger from './Logger';

class Clogy extends Logger {

  /**
   * If you are using another JavaScript library that uses the clogy variable,
   * you can run into conflicts with this library. In order to avoid these
   * conflicts, you need to put clogy in no-conflict mode immediately after it
   * is loaded onto the page and before you attempt to use clogy in your page.
   * It works similar to jQuery's no-conflict mode
   * @returns {clogy} Returns current instance i.e. clogy
   */
  noConflict(): this {

    // No need of ===, typeof returns a string
    if (typeof(window) != 'undefined' && window.clogy) {

      // it will be deleted because clogy is not a variable, but
      // a property of the global object i.e. window;
      // check yourself ('clogy' in window) -> false after deletion
      delete window.clogy;
    }

    return this;
  }

  /**
   * Used to extend logging functionality. Can be used for:
   * 1. Adding a prefix
   * 2. Submitting logs to server
   * 3. Logging to a file
   * 4. Showing toast messages
   * @param  {Function} decoFunc: A decorator callback for extending logging
   *                               functionality
   * @returns {void | undefined} Returns nothing
   */
  decorator(decoFunc: () => void): void {

    // No need of ===, typeof returns a string
    if (typeof(decoFunc) != 'function') {
      throw new TypeError('Decorator should be a function');
    }

    decoFunc(singleton.getInstance(this));
  }
}

// JS hoisting will not work with Classes
export default Clogy;
