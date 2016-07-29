/*! clogy - v1.0.0 * https://github.com/pgmanutd/clogy * (c) 2016 pgmanutd * licensed MIT */
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

	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  get loggingLevels() {
	    return {
	      types: {
	        log: 1,
	        trace: 2,
	        debug: 3,
	        info: 4,
	        warn: 5,
	        error: 6,
	        none: 7
	      },
	      get range() {
	        return {
	          min: this.types.log,
	          max: this.types.none
	        };
	      }
	    };
	  },
	  options: {
	    showDateTime: false,
	    prefix: ''
	  },
	  methods: ['log', 'trace', 'debug', 'info', 'warn', 'error']
		};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _globalConstants = __webpack_require__(1);

	var _globalConstants2 = _interopRequireDefault(_globalConstants);

	var _globalUtilities = __webpack_require__(3);

	var _globalUtilities2 = _interopRequireDefault(_globalUtilities);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	////////////////////////////////////////////////////////////////////////////////

	var Loggers = function Loggers() {
	  _classCallCheck(this, Loggers);
	};

	_globalConstants2.default.methods.forEach(function (method) {

	  // Not using arrow functions because 'this' will be undefined
	  // (Arrow functions capture the this value of the enclosing context)
	  Loggers.prototype[method] = function () {
	    var logToConsoleParams = {
	      currentLogLevel: this.getLevel(),
	      loggingType: method,
	      options: this.options
	    };

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _globalUtilities2.default.logToConsole(logToConsoleParams, args);
	  };
	});
	////////////////////////////////////////////////////////////////////////////////

	var Clogy = function (_Loggers) {
	  _inherits(Clogy, _Loggers);

	  function Clogy() {
	    _classCallCheck(this, Clogy);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Clogy).call(this));

	    _this._level = null;
	    _this.options = {};

	    _this._init();
	    return _this;
	  }

	  _createClass(Clogy, [{
	    key: '_init',
	    value: function _init() {

	      // Set default log level
	      this.setLevel(_globalConstants2.default.loggingLevels.types.info);

	      var _GLOBAL_CONSTANTS$opt = _globalConstants2.default.options;
	      this.options.showDateTime = _GLOBAL_CONSTANTS$opt.showDateTime;
	      this.options.prefix = _GLOBAL_CONSTANTS$opt.prefix;
	    }
	  }, {
	    key: 'getLevel',
	    value: function getLevel() {
	      return this._level;
	    }
	  }, {
	    key: 'setLevel',
	    value: function setLevel(logLevel) {
	      var _logLevel = logLevel;

	      // No need of ===, typeof returns a string
	      if (typeof _logLevel == 'string') {
	        _logLevel = _globalConstants2.default.loggingLevels.types[_logLevel.toLowerCase()];
	      }

	      // No need to check if log level is less or more than min and max or invalid
	      // Will be handled when logging
	      this._level = _logLevel;
	    }
	  }, {
	    key: 'enableAllLevels',
	    value: function enableAllLevels() {
	      this.setLevel(_globalConstants2.default.loggingLevels.types.log);
	    }
	  }, {
	    key: 'disableAllLevels',
	    value: function disableAllLevels() {
	      this.setLevel(_globalConstants2.default.loggingLevels.types.none);
	    }
	  }, {
	    key: 'decorator',
	    value: function decorator(decoFunc) {

	      // No need of ===, typeof returns a string
	      if (typeof decoFunc != 'function') {
	        throw new TypeError('Decorator handler should be a function');
	      }

	      decoFunc(_globalUtilities2.default.singelton.getInstance(this));
	    }
	  }, {
	    key: 'LEVELS',
	    get: function get() {
	      return _globalConstants2.default.loggingLevels.types;
	    }
	  }]);

	  return Clogy;
	}(Loggers);

	var clogy = new Clogy();

	////////////////////////////////////////////////////////////////////////////////
	/* clogy Methods only*/

	// Not using arrow functions because 'this' will be undefined
	// (Arrow functions capture the this value of the enclosing context)
	clogy.noConflict = function () {

	  // No need of ===, typeof returns a string
	  if (typeof window != 'undefined' && window.clogy) {

	    // it will be deleted because clogy is not a variable, but
	    // a property of the global object i.e. window;
	    // check yourself ('clogy' in window) -> false after deletion
	    delete window.clogy;
	  }

	  return this;
	};
	////////////////////////////////////////////////////////////////////////////////

	exports.default = clogy;

	// Because of Babel@6
	// Can use plugin: https://www.npmjs.com/package/babel-plugin-add-module-exports
	// Used this soln. instead:
	// http://stackoverflow.com/questions/34736771/webpack-umd-library-return-object-default/34778391#34778391

		module.exports = clogy;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _globalConstants = __webpack_require__(1);

	var _globalConstants2 = _interopRequireDefault(_globalConstants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var singelton = function () {
	  var instance = void 0;

	  function createInstance(originalInstance) {
	    return Object.getPrototypeOf(Object.getPrototypeOf(originalInstance));
	  }

	  return {
	    getInstance: function getInstance(originalInstance) {
	      if (!instance) {
	        instance = createInstance(originalInstance);
	      }
	      return instance;
	    }
	  };
	}();

	var logToConsole = function () {
	  var DEFAULT_LOGGING_TYPE = 'log';

	  function isLogLevelValid(currentLogLevel) {
	    return !!(currentLogLevel && currentLogLevel >= _globalConstants2.default.loggingLevels.range.min && currentLogLevel <= _globalConstants2.default.loggingLevels.range.max);
	  }

	  function isNoneLogLevel(currentLogLevel) {
	    return currentLogLevel === _globalConstants2.default.loggingLevels.types.none;
	  }

	  function isLoggingAllowed(currentLogLevel, loggingType) {
	    return _globalConstants2.default.loggingLevels.types[loggingType] >= currentLogLevel;
	  }

	  function isConsoleDefined() {

	    // No need of ===, typeof returns a string
	    return typeof console != 'undefined';
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
	    Function.prototype.bind.call(consoleLoggingType, console).apply(console, args);
	  }

	  // Function style programming;
	  // No mutating params, no state known beforehand
	  return function (logToConsoleParams, args) {
	    var currentLogLevel = logToConsoleParams.currentLogLevel;
	    var loggingType = logToConsoleParams.loggingType;
	    var _logToConsoleParams$o = logToConsoleParams.options;
	    var options = _logToConsoleParams$o === undefined ? {} : _logToConsoleParams$o;


	    if (!isLogLevelValid(currentLogLevel)) {
	      throw new RangeError('Invalid LogLevel set, Please set a valid LogLevel');
	    }

	    if (isNoneLogLevel(currentLogLevel) || !isConsoleDefined() || !isLoggingAllowed(currentLogLevel, loggingType)) {
	      return;
	    }

	    /////////////////////////////////////////////
	    var consoleOptions = [];

	    if (options.showDateTime) {

	      // Better readability than consoleOptions[consoleOptions.length] = value
	      consoleOptions.push(getDateTime() + ':');
	    }

	    if (options.prefix) {
	      consoleOptions.push(options.prefix);
	    }

	    justLogItDude(loggingType, [].concat(consoleOptions, _toConsumableArray(args)));
	  };
	}();

	////////////////////////////////////////////////////////////////////////////////

		exports.default = { singelton: singelton, logToConsole: logToConsole };

/***/ }
/******/ ])
});
;
//# sourceMappingURL=clogy.js.map