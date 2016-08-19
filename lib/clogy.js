/*! clogy - v1.0.4 * https://github.com/pgmanutd/clogy * (c) 2016 pgmanutd * licensed MIT */
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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _loggingLevels = __webpack_require__(1);

	var _loggingLevels2 = _interopRequireDefault(_loggingLevels);

	var _loggingDefaultOptions = __webpack_require__(2);

	var _loggingDefaultOptions2 = _interopRequireDefault(_loggingDefaultOptions);

	var _loggingMethods = __webpack_require__(3);

	var _loggingMethods2 = _interopRequireDefault(_loggingMethods);

	var _logging = __webpack_require__(7);

	var _logging2 = _interopRequireDefault(_logging);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Logger = function () {
	  function Logger() {
	    _classCallCheck(this, Logger);

	    this._level = null;
	    this.options = {};

	    this._init();
	  }

	  Logger.prototype._init = function _init() {

	    // Set default log level
	    this.setLevel(_loggingLevels2.default.types.info);

	    this.options.showDateTime = _loggingDefaultOptions2.default.showDateTime;
	    this.options.prefix = _loggingDefaultOptions2.default.prefix;
	  };

	  Logger.prototype.getLevel = function getLevel() {
	    return this._level;
	  };

	  Logger.prototype.setLevel = function setLevel(logLevel) {
	    var _logLevel = logLevel;

	    // No need of ===, typeof returns a string
	    if (typeof _logLevel == 'string') {
	      _logLevel = _loggingLevels2.default.types[_logLevel.toLowerCase()];
	    }

	    // No need to check if log level is less or more than min and max or invalid
	    // Will be handled when logging
	    this._level = _logLevel;
	  };

	  Logger.prototype.enableAllLevels = function enableAllLevels() {
	    this.setLevel(_loggingLevels2.default.types.log);
	  };

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

	_loggingMethods2.default.forEach(function (method) {

	  // Not using arrow functions because 'this' will be undefined
	  // (Arrow functions capture the this value of the enclosing context)
	  Logger.prototype[method] = function () {
	    var logToConsoleParams = {
	      currentLogLevel: this.getLevel(),
	      loggingType: method,
	      options: this.options
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

	function isConsoleDefined() {

	  // No need of ===, typeof returns a string
	  return typeof console != 'undefined';
	}

	function isLogLevelValid(currentLogLevel) {
	  return !!(currentLogLevel && currentLogLevel >= _loggingLevels2.default.range.min && currentLogLevel <= _loggingLevels2.default.range.max);
	}

	function isNoneLogLevel(currentLogLevel) {
	  return currentLogLevel === _loggingLevels2.default.types.none;
	}

	function isLoggingAllowed(currentLogLevel, loggingType) {
	  return _loggingLevels2.default.types[loggingType] >= currentLogLevel;
	}

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

	function justLogItDude(loggingType, args) {
	  var consoleLoggingType = console[loggingType] || console[DEFAULT_LOGGING_TYPE];

	  // No need of ===, typeof returns a string
	  if (typeof consoleLoggingType != 'function') {

	    // I don't want to break an application if someone intentionally
	    // deleted the logging methods, so skipping error here
	    return;
	  }

	  Function.prototype.bind.call(consoleLoggingType, console).apply(console, args);
	}

	// Functional style programming;
	// No mutating params, no state known beforehand
	function logToConsole(logToConsoleParams, args) {
	  if (!isConsoleDefined()) {
	    return;
	  }

	  var currentLogLevel = logToConsoleParams.currentLogLevel;
	  var loggingType = logToConsoleParams.loggingType;
	  var _logToConsoleParams$o = logToConsoleParams.options;
	  var options = _logToConsoleParams$o === undefined ? {} : _logToConsoleParams$o;


	  if (!isLogLevelValid(currentLogLevel)) {
	    throw new RangeError('Invalid LogLevel set, Please set a valid LogLevel');
	  }

	  if (isNoneLogLevel(currentLogLevel) || !isLoggingAllowed(currentLogLevel, loggingType)) {
	    return;
	  }

	  /////////////////////////////////////////////
	  var consoleOptions = [];

	  if (options.showDateTime) {

	    // Better readability than consoleOptions[consoleOptions.length] = value
	    consoleOptions.push(getDateTime() + ': ');
	  }

	  if (options.prefix) {
	    consoleOptions.push(options.prefix);
	  }

	  justLogItDude(loggingType, [].concat(consoleOptions, args));
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	var instance = void 0;

	// I prefer default export rather than named export
	exports.default = {
	  getInstance: getInstance
	};

	////////////////////////

	function createInstance(originalInstance) {
	  // Cached lookup once
	  var proto = Object.getPrototypeOf;

	  return proto(proto(originalInstance));
	}

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