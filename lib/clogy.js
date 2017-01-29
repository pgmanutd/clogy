/*! clogy - v1.3.0 * https://github.com/pgmanutd/clogy * (c) 2017 pgmanutd * licensed MIT */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["clogy"] = factory();
	else
		root["clogy"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(7);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.LOGGING_METHODS = exports.LOGGING_LEVELS = exports.LOGGING_DEFAULT_OPTIONS = undefined;

	var _loggingDefaultOptions = __webpack_require__(4);

	var _loggingDefaultOptions2 = _interopRequireDefault(_loggingDefaultOptions);

	var _loggingLevels = __webpack_require__(5);

	var _loggingLevels2 = _interopRequireDefault(_loggingLevels);

	var _loggingMethods = __webpack_require__(6);

	var _loggingMethods2 = _interopRequireDefault(_loggingMethods);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.LOGGING_DEFAULT_OPTIONS = _loggingDefaultOptions2.default;
	exports.LOGGING_LEVELS = _loggingLevels2.default;
	exports.LOGGING_METHODS = _loggingMethods2.default;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _constants = __webpack_require__(1);

	// I prefer default export rather than named export
	exports.default = {
	  isConsoleDefined: isConsoleDefined,
	  isLogLevelValid: isLogLevelValid,
	  isNoneLogLevel: isNoneLogLevel,
	  isLoggingAllowed: isLoggingAllowed,
	  getDateTime: getDateTime
	};

	////////////////////////

	/**
	 * Check if console is available or not
	 * @returns {Boolean} Returns true or false
	 */

	function isConsoleDefined() {

	  // No need of ===, typeof returns a string
	  return typeof console != 'undefined';
	}

	/**
	 * Check if current log level is valid, less than max
	 * and more than min log level
	 * @param  {Number}  logLevel: Current log level eg. 1, 2, 3, 4
	 * @returns {Boolean} Returns true or false
	 */
	function isLogLevelValid(logLevel) {
	  return !!(logLevel && logLevel >= _constants.LOGGING_LEVELS.range.min && logLevel <= _constants.LOGGING_LEVELS.range.max);
	}

	/**
	 * Check if current log level is none thus logging is disabled
	 * @param  {Number}  logLevel: Current log level eg. 1, 2, 3, 4
	 * @returns {Boolean} Returns true or false
	 */
	function isNoneLogLevel(logLevel) {
	  return logLevel === _constants.LOGGING_LEVELS.types.none;
	}

	/**
	 * Check if level of passed log method is more than (or equal to) the
	 * current log level, thus allowing logging accordingly
	 * @param  {Number}  logLevel: Current log level eg. 1, 2, 3, 4
	 * @param  {String}  loggingType    : logging method eg. log, info, error, warn
	 * @returns {Boolean} Returns true or false
	 */
	function isLoggingAllowed(logLevel, loggingType) {
	  return _constants.LOGGING_LEVELS.types[loggingType] >= logLevel;
	}

	/**
	 * Get current date and time
	 * @returns {String} Returns date and time in string format
	 */
	function getDateTime() {
	  var d = new Date();
	  var date = d.toDateString();

	  var customTimeFormat = d.toTimeString().match(/^([0-9]{2}:[0-9]{2}:[0-9]{2})/);

	  var time = customTimeFormat && customTimeFormat.length ? customTimeFormat[0] : '';

	  // NOTE: hey..!! see, 3 is not a magic number, if you think it is, then
	  // it's just milliseconds in 3 digits (000-999)
	  var appendMilliseconds = ('00' + d.getMilliseconds()).slice(-3);

	  return date + ' ' + time + '.' + appendMilliseconds;
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.singleton = exports.logging = exports.common = undefined;

	var _common = __webpack_require__(2);

	var _common2 = _interopRequireDefault(_common);

	var _logging = __webpack_require__(10);

	var _logging2 = _interopRequireDefault(_logging);

	var _singleton = __webpack_require__(11);

	var _singleton2 = _interopRequireDefault(_singleton);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.common = _common2.default;
	exports.logging = _logging2.default;
	exports.singleton = _singleton2.default;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.default = Object.freeze({
	  showDateTime: false,
	  prefix: ''
		});

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports.default = Object.freeze({
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
		});

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
		exports.default = ['log', 'trace', 'debug', 'info', 'warn', 'error'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _Clogy = __webpack_require__(8);

	var _Clogy2 = _interopRequireDefault(_Clogy);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var clogy = new _Clogy2.default();

	exports.default = clogy;

	// Because of Babel@6
	// Can use plugin: https://www.npmjs.com/package/babel-plugin-add-module-exports
	// Used this soln. instead:
	// http://stackoverflow.com/questions/34736771/webpack-umd-library-return-object-default/34778391#34778391
	//
	// This is intended behaviour from babel@ to babel@6 to support ES6 import export module system
	//
	// $FlowFixMe: suppressing this error until babel changes this style

		module.exports = clogy;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _utilities = __webpack_require__(3);

	var _Logger2 = __webpack_require__(9);

	var _Logger3 = _interopRequireDefault(_Logger2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Clogy = function (_Logger) {
	  _inherits(Clogy, _Logger);

	  function Clogy() {
	    _classCallCheck(this, Clogy);

	    return _possibleConstructorReturn(this, _Logger.apply(this, arguments));
	  }

	  /**
	   * If you are using another JavaScript library that uses the clogy variable,
	   * you can run into conflicts with this library. In order to avoid these
	   * conflicts, you need to put clogy in no-conflict mode immediately after it
	   * is loaded onto the page and before you attempt to use clogy in your page.
	   * It works similar to jQuery's no-conflict mode
	   * @returns {clogy} Returns current instance i.e. clogy
	   */
	  Clogy.prototype.noConflict = function noConflict() {

	    // No need of ===, typeof returns a string
	    if (typeof window != 'undefined' && window.clogy) {

	      // it will be deleted because clogy is not a variable, but
	      // a property of the global object i.e. window;
	      // check yourself ('clogy' in window) -> false after deletion
	      delete window.clogy;
	    }

	    return this;
	  };

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


	  Clogy.prototype.decorator = function decorator(decoFunc) {

	    // No need of ===, typeof returns a string
	    if (typeof decoFunc != 'function') {
	      throw new TypeError('Decorator should be a function');
	    }

	    decoFunc(_utilities.singleton.getInstance(this));
	  };

	  return Clogy;
	}(_Logger3.default);

	// JS hoisting will not work with Classes


		exports.default = Clogy;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _constants = __webpack_require__(1);

	var _utilities = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Logger = function () {
	  /***********************************/

	  /**** Flow's annotation syntax ****/
	  function Logger() {
	    _classCallCheck(this, Logger);

	    // See it's better to keep these two in state rather than creating a
	    // local variable for them. This way we can keep OOP style along with
	    // functional style programming

	    // Avoiding Object reshaping
	    this._options = {
	      showDateTime: null,
	      prefix: null
	    };

	    this._level = null;

	    this._setDefaults();
	  }

	  /**
	   * Setting default options like prefix, showDateTime, log level
	   * @returns {void | undefined} Returns nothing
	   */


	  Logger.prototype._setDefaults = function _setDefaults() {

	    // Set default options
	    this.setOptions(_constants.LOGGING_DEFAULT_OPTIONS);

	    // Set default log level
	    this.setLevel(this.LEVELS.info); // No need to use LOGGING_LEVELS.types.info again here
	  };

	  /**
	   * Used for returning config options
	   * @returns {ClogyOptionsType | null} Returns config options
	   */


	  Logger.prototype.getOptions = function getOptions() {
	    return this._options;
	  };

	  /**
	   * Used for setting options (showDateTime and prefix)
	   * @param  {ClogyOptionsType} options: Console options like showDateTime, prefix
	   * @returns {void | undefined} Returns nothing
	   */


	  Logger.prototype.setOptions = function setOptions(options) {
	    this._options = _extends({}, this.getOptions(), options);
	  };

	  /**
	   * Used for returning current log level; Default is info
	   * @returns {Number | null} Returns current log level
	   */


	  Logger.prototype.getLevel = function getLevel() {
	    return this._level;
	  };

	  /**
	   * Used for setting current log level
	   * @param  {number | string} level: log level (number or string)
	   * @returns {void | undefined} Returns nothing
	   * @example:
	   * clogy.setLevel(1); // log; number type argument
	   * clogy.setLevel(clogy.LEVELS.log); // log; enum type argument
	   * clogy.setLevel('log'); // log; string type argument
	   */


	  Logger.prototype.setLevel = function setLevel(level) {

	    // No need to check if log level is less or more than min and max or invalid
	    // Will be handled when logging
	    this._level = typeof level == 'string' ? // No need of ===, typeof returns a string
	    this.LEVELS[level.toLowerCase()] : level;
	  };

	  /**
	   * I know this should be static, but I am exposing instance instead of class
	   * If LEVELS are static, may be we can do clogy.__proto__.constructor.LEVELS
	   * or Object.getPrototypeOf(clogy).constructor.LEVELS, but that's not a good
	   * way to access static property
	   *
	   * Different log levels (along with values); use them to set current log level
	   *  1. 'log': 1
	   *  2. 'trace': 2
	   *  3. 'debug': 3
	   *  4. 'info': 4
	   *  5. 'warn': 5
	   *  6. 'error': 6
	   *  7. 'none': 7 (if current level is none, it won't log anything)
	   *
	   * If current log level is 'info', then all the levels below 'info' are valid
	   * and rest are invalid. It means ' clogy.info()', 'clogy.warn()' and
	   * 'clogy.error()' will work but 'clogy.log()', 'clogy.trace()' and
	   * 'clogy.debug()' won't
	   * @returns {LevelsType} Returns all log levels
	   */


	  /**
	   * Get stringifed allowed loggers (Order goes from top to bottom). Use utf-8 encoding for showing tick and cross marks, if not visible.
	   * @returns {String} Returns stringifed allowed loggers
	   * @example:
	   * clogy.stringifyAllowedLoggers(); // When current log level is info
	   * =>  1: log ✖
	   *     2: trace ✖
	   *     3: debug ✖
	   *     4: info ✔
	   *     5: warn ✔
	   *     6: error ✔
	   */
	  Logger.prototype.stringifyAllowedLoggers = function stringifyAllowedLoggers() {
	    var _this = this;

	    var tickMark = '\u2714';
	    var crossMark = '\u2716';

	    return _constants.LOGGING_METHODS.map(function (loggingType, index) {
	      return index + 1 + ': ' + loggingType + ' ' + (_utilities.common.isLoggingAllowed(_this.getLevel(), loggingType) ? tickMark : crossMark);
	    }).join('\n');
	  };

	  /**
	   * Enable all levels; equivalent to 'clogy.setLevel(clogy.LEVELS.log)''
	   * @returns {void | undefined} Returns nothing
	   */


	  Logger.prototype.enableAllLevels = function enableAllLevels() {
	    this.setLevel(this.LEVELS.log);
	  };

	  /**
	   * Disable all levels; equivalent to 'clogy.setLevel(clogy.LEVELS.none)''
	   * @returns {void | undefined} Returns nothing
	   */


	  Logger.prototype.disableAllLevels = function disableAllLevels() {
	    this.setLevel(this.LEVELS.none);
	  };

	  _createClass(Logger, [{
	    key: 'LEVELS',
	    get: function get() {
	      return _constants.LOGGING_LEVELS.types;
	    }
	  }]);

	  return Logger;
	}();

	////////////////////////

	// Cached prototype once


	var loggerPrototype = Logger.prototype;

	/**
	 * Array.ForEach is slower than for() in for each for Arrays in JavaScript;
	 * but negligible performance hit here (small loop).
	 * We are also maintaining functional style programming here
	 *
	 * Logging methods such as log, info, error, warn etc. Used
	 * for logging to console
	 * @returns {void | undefined} Returns nothing
	 */
	_constants.LOGGING_METHODS.forEach(function (method) {

	  // Not using arrow functions because 'this' will be undefined
	  // (Arrow functions capture the this value of the enclosing context)
	  loggerPrototype[method] = function () {
	    var logToConsoleParams = {
	      currentLogLevel: this.getLevel(),
	      loggingType: method,
	      options: this.getOptions()
	    };

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _utilities.logging.logToConsole(logToConsoleParams, args);
	  };
	});

	////////////////////////

	// JS hoisting will not work with Classes
	exports.default = Logger;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _constants = __webpack_require__(1);

	var _common = __webpack_require__(2);

	var _common2 = _interopRequireDefault(_common);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DEFAULT_LOGGING_TYPE = 'log';

	// I prefer default export rather than named export
	exports.default = {
	  logToConsole: logToConsole
	};

	////////////////////////

	/**
	 * Get console options and push them into an array (for logging)
	 * @param  {ClogyOptionsType} options: Console options like showDateTime, prefix
	 * @returns {any[]} Returns an array of console options
	 */

	function getConsoleOptions(options) {
	  var consoleOptions = [];

	  if (options.showDateTime) {

	    // Better readability than consoleOptions[consoleOptions.length] = value
	    consoleOptions.push(_common2.default.getDateTime() + ': ');
	  }

	  if (options.prefix) {
	    consoleOptions.push(options.prefix);
	  }

	  return consoleOptions;
	}

	/**
	 * Used for logging to console
	 * @param  {String} loggingType: logging method eg. log, info, error, warn
	 * @param  {any}    args       : any value
	 * @returns {void | undefined} Returns nothing
	 */
	function justLogItDude(loggingType, args) {
	  var consoleLoggingType = console[loggingType] || console[DEFAULT_LOGGING_TYPE];

	  // I know this should be returned earlier but there is
	  // negligible performance hit.
	  // May be I can move this to a function which can return me
	  // consoleLoggingType or false (maintain S of SOLID),
	  // but I prefer this to be here
	  if (!consoleLoggingType) {
	    return;
	  }

	  // The console object is not part of any standard and is an extension to the
	  // Document Object Model. Like other DOM objects, it is considered a host
	  // object and is not required to inherit from Object, nor its methods from
	  // Function, like native ECMAScript functions and objects do. This is the
	  // reason apply and call are undefined on those methods. In IE9, most DOM
	  // objects were improved to inherit from native ECMAScript types. As the
	  // developer tools are considered an extension to IE
	  // (albeit, a built-in extension), they clearly didn't receive the same
	  // improvements as the rest of the DOM.
	  // For what it's worth, you can still use some Function.prototype methods
	  // on console methods with a little bind() magic
	  Function.prototype.bind.call(consoleLoggingType, console).apply(console, args);
	}

	/**
	 * Used for logging to console
	 * Functional style programming; No mutating params, no state known beforehand
	 * @param  {
	              currentLogLevel: number,
	              loggingType: string,
	              options: ClogyOptionsType
	           }        params: Object containing current log level ,
	 *                          log methods, default options like prefix
	 * @param  {any}    args  : any value
	 * @returns {void | undefined} Returns nothing
	 */
	function logToConsole() {
	  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	      currentLogLevel = _ref.currentLogLevel,
	      loggingType = _ref.loggingType,
	      _ref$options = _ref.options,
	      options = _ref$options === undefined ? _constants.LOGGING_DEFAULT_OPTIONS : _ref$options;

	  var args = arguments[1];

	  if (!_common2.default.isConsoleDefined()) {
	    return;
	  }

	  if (!_common2.default.isLogLevelValid(currentLogLevel)) {
	    throw new RangeError('Invalid LogLevel set, Please set a valid LogLevel');
	  }

	  if (_common2.default.isNoneLogLevel(currentLogLevel) || !_common2.default.isLoggingAllowed(currentLogLevel, loggingType)) {
	    return;
	  }

	  // Open array's arguments (array spread operator)
	  justLogItDude(loggingType, [].concat(getConsoleOptions(options), args));
	}

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;


	var instance = void 0;

	// I prefer default export rather than named export


	exports.default = {
	  getInstance: getInstance
	};

	////////////////////////

	/**
	 * Creates new instance from Clogy's parent i.e. Logger (a copy of parent)
	 * @param  {ClogyType} originalInstance: clogy's instance
	 * @returns {ClogyType} Returns a copy of parent
	 */

	function createInstance(originalInstance) {
	  // Cached lookup once
	  var proto = Object.getPrototypeOf;

	  return proto(proto(originalInstance));
	}

	/**
	 * Get cached instance
	 * @param  {ClogyType} originalInstance: clogy's instance
	 * @returns {ClogyType} Returns a copy of parent (cached)
	 */
	function getInstance(originalInstance) {
	  // No need to go deep into prototype chain again
	  if (!instance) {
	    instance = createInstance(originalInstance);
	  }

	  return instance;
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=clogy.js.map