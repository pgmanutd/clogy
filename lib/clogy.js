/*! clogy - v1.0.6 * https://github.com/pgmanutd/clogy * (c) 2016 pgmanutd * licensed MIT */
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

	module.exports = __webpack_require__(4);


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports.default = {
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

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.default = {
	  showDateTime: false,
	  prefix: ''
		};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
		exports.default = ['log', 'trace', 'debug', 'info', 'warn', 'error'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _Clogy = __webpack_require__(5);

	var _Clogy2 = _interopRequireDefault(_Clogy);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var clogy = new _Clogy2.default();

	exports.default = clogy;

	// Because of Babel@6
	// Can use plugin: https://www.npmjs.com/package/babel-plugin-add-module-exports
	// Used this soln. instead:
	// http://stackoverflow.com/questions/34736771/webpack-umd-library-return-object-default/34778391#34778391
	//
	// $FlowFixMe: suppressing this error until babel changes this style

		module.exports = clogy;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _singleton = __webpack_require__(8);

	var _singleton2 = _interopRequireDefault(_singleton);

	var _Logger2 = __webpack_require__(6);

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
	   * @return {clogy} Returns current instance i.e. clogy
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
	   * @return {void | undefined} Returns nothing
	   */


	  Clogy.prototype.decorator = function decorator(decoFunc) {

	    // No need of ===, typeof returns a string
	    if (typeof decoFunc != 'function') {
	      throw new TypeError('Decorator should be a function');
	    }

	    decoFunc(_singleton2.default.getInstance(this));
	  };

	  return Clogy;
	}(_Logger3.default);

	// JS hoisting will not work with Classes


		exports.default = Clogy;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _loggingDefaultOptions = __webpack_require__(2);

	var _loggingDefaultOptions2 = _interopRequireDefault(_loggingDefaultOptions);

	var _loggingLevels = __webpack_require__(1);

	var _loggingLevels2 = _interopRequireDefault(_loggingLevels);

	var _loggingMethods = __webpack_require__(3);

	var _loggingMethods2 = _interopRequireDefault(_loggingMethods);

	var _logging = __webpack_require__(7);

	var _logging2 = _interopRequireDefault(_logging);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	   * @return {void | undefined} Returns nothing
	   */


	  Logger.prototype._setDefaults = function _setDefaults() {

	    // Set default options
	    this.setOptions(_loggingDefaultOptions2.default);

	    // Set default log level
	    this.setLevel(_loggingLevels2.default.types.info);
	  };

	  /**
	   * getOptions() not required
	   *
	   * Used for setting options (showDateTime and prefix)
	   * @return {void | undefined} Returns nothing
	   */


	  Logger.prototype.setOptions = function setOptions(options) {
	    this._options = _extends({}, this._options, options);
	  };

	  /**
	   * Used for returning current log level; Default is info
	   * @return {Number | null} Returns current log level
	   */


	  Logger.prototype.getLevel = function getLevel() {
	    return this._level;
	  };

	  /**
	   * Used for setting current log level
	   * @param  {number | string} level: log level (number or string)
	   * @return {void | undefined} Returns nothing
	   * @example:
	   * clogy.setLevel(1); // log; number type argument
	   * clogy.setLevel(clogy.LEVELS.log); // log; enum type argument
	   * clogy.setLevel('log'); // log; string type argument
	   */


	  Logger.prototype.setLevel = function setLevel(level) {

	    // No need to check if log level is less or more than min and max or invalid
	    // Will be handled when logging
	    this._level = typeof level == 'string' ? // No need of ===, typeof returns a string
	    _loggingLevels2.default.types[level.toLowerCase()] : level;
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
	   * @return {LevelsType} Returns all log levels
	   */


	  /**
	   * Enable all levels; equivalent to 'clogy.setLevel(clogy.LEVELS.log)''
	   * @return {void | undefined} Returns nothing
	   */
	  Logger.prototype.enableAllLevels = function enableAllLevels() {
	    this.setLevel(_loggingLevels2.default.types.log);
	  };

	  /**
	   * Disable all levels; equivalent to 'clogy.setLevel(clogy.LEVELS.none)''
	   * @return {void | undefined} Returns nothing
	   */


	  Logger.prototype.disableAllLevels = function disableAllLevels() {
	    this.setLevel(_loggingLevels2.default.types.none);
	  };

	  _createClass(Logger, [{
	    key: 'LEVELS',
	    get: function get() {
	      return _loggingLevels2.default.types;
	    }
	  }]);

	  return Logger;
	}();

	////////////////////////

	// Cached prototype once


	var loggerPrototype = Logger.prototype;

	/**
	 * Logging methods such as log, info, error, warn etc. Used
	 * for logging to console
	 * @return {void | undefined} Returns nothing
	 */
	_loggingMethods2.default.forEach(function (method) {

	  // Not using arrow functions because 'this' will be undefined
	  // (Arrow functions capture the this value of the enclosing context)
	  loggerPrototype[method] = function () {
	    var logToConsoleParams = {
	      currentLogLevel: this.getLevel(),
	      loggingType: method,
	      options: this._options
	    };

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _logging2.default.logToConsole(logToConsoleParams, args);
	  };
	});

	////////////////////////

	// JS hoisting will not work with Classes
	exports.default = Logger;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _loggingLevels = __webpack_require__(1);

	var _loggingLevels2 = _interopRequireDefault(_loggingLevels);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DEFAULT_LOGGING_TYPE = 'log';

	// I prefer default export rather than named export


	exports.default = {
	  logToConsole: logToConsole
	};

	////////////////////////

	/**
	 * Check if console is available or not
	 * @return {Boolean} Returns true or false
	 */

	function isConsoleDefined() {

	  // No need of ===, typeof returns a string
	  return typeof console != 'undefined';
	}

	/**
	 * Check if current log level is valid, less than max
	 * and more than min log level
	 * @param  {Number}  currentLogLevel: Current log level eg. 1, 2, 3, 4
	 * @return {Boolean} Returns true or false
	 */
	function isLogLevelValid(currentLogLevel) {
	  return !!(currentLogLevel && currentLogLevel >= _loggingLevels2.default.range.min && currentLogLevel <= _loggingLevels2.default.range.max);
	}

	/**
	 * Check if current log level is none thus logging is disabled
	 * @param  {Number}  currentLogLevel: Current log level eg. 1, 2, 3, 4
	 * @return {Boolean} Returns true or false
	 */
	function isNoneLogLevel(currentLogLevel) {
	  return currentLogLevel === _loggingLevels2.default.types.none;
	}

	/**
	 * Check if current log level is more than level of current log method, thus
	 * allowing logging accordingly
	 * @param  {Number}  currentLogLevel: Current log level eg. 1, 2, 3, 4
	 * @param  {String}  loggingType    : logging method eg. log, info, error, warn
	 * @return {Boolean} Returns true or false
	 */
	function isLoggingAllowed(currentLogLevel, loggingType) {
	  return _loggingLevels2.default.types[loggingType] >= currentLogLevel;
	}

	/**
	 * Get current date and time
	 * @return {String} Returns date and time in string format
	 */
	function getDateTime() {
	  var d = new Date();
	  var date = d.toDateString();

	  // 0 means first matched string, which will be true always unless someone
	  // overrides the result
	  var time = d.toTimeString().match(/^([0-9]{2}:[0-9]{2}:[0-9]{2})/)[0];

	  // NOTE: hey..!! see, 3 is not a magic number, if you think it is, then
	  // it's just milliseconds in 3 digits (000-999)
	  var appendMilliseconds = ('00' + d.getMilliseconds()).slice(-3);

	  return date + ' ' + time + '.' + appendMilliseconds;
	}

	/**
	 * Get console options and push them into an array (for logging)
	 * @param  {Object} options: Console options like showDateTime, prefix
	 * @return {any[]} Returns an array of console options
	 */
	function getConsoleOptions(options) {
	  var consoleOptions = [];

	  if (options.showDateTime) {

	    // Better readability than consoleOptions[consoleOptions.length] = value
	    consoleOptions.push(getDateTime() + ': ');
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
	 * @return {void | undefined} Returns nothing
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
	 * @param  {Object} params: Object containing current log level ,
	 *                          log methods, default options like prefix
	 * @param  {any}    args  : any value
	 * @return {void | undefined} Returns nothing
	 */
	function logToConsole(params, args) {
	  if (!isConsoleDefined()) {
	    return;
	  }

	  var currentLogLevel = params.currentLogLevel;
	  var loggingType = params.loggingType;
	  var _params$options = params.options;
	  var options = _params$options === undefined ? {} : _params$options;


	  if (!isLogLevelValid(currentLogLevel)) {
	    throw new RangeError('Invalid LogLevel set, Please set a valid LogLevel');
	  }

	  if (isNoneLogLevel(currentLogLevel) || !isLoggingAllowed(currentLogLevel, loggingType)) {
	    return;
	  }

	  // Open array's arguments (array spread operator)
	  justLogItDude(loggingType, [].concat(getConsoleOptions(options), args));
	}

/***/ },
/* 8 */
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
	 * @return {ClogyType} Returns a copy of parent
	 */

	function createInstance(originalInstance) {
	  // Cached lookup once
	  var proto = Object.getPrototypeOf;

	  return proto(proto(originalInstance));
	}

	/**
	 * Get cached instance
	 * @param  {ClogyType} originalInstance: clogy's instance
	 * @return {ClogyType} Returns a copy of parent (cached)
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