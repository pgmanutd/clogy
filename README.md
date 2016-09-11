# clogy [![npm](https://img.shields.io/npm/v/clogy.svg)](https://www.npmjs.com/package/clogy) [![Build Status](https://travis-ci.org/pgmanutd/clogy.svg?branch=master)](https://travis-ci.org/pgmanutd/clogy) [![Coverage Status](https://coveralls.io/repos/github/pgmanutd/clogy/badge.svg?branch=master)](https://coveralls.io/github/pgmanutd/clogy?branch=master)

A logging library for browsers and nodejs environment. It replaces console's logging functions (such as log, warn, error, info etc) with level-based logging.

It creates a wrapper over all the console's logging functions and provide decorators for extending the basic functionalities.

#### Browsers and NodeJS Support (```ES5+```)
* ```IE9+```: To support IE9 and IE10, Enabled loose mode in babel
* ```Chrome 10+```
* ```Firefox 4+```
* ```Safari 6+```
* ```Opera 12+```
* ```NodeJS 0.5.1+```

Features
----
* Very lightweight (```5KB``` minified)
* No dependencies
* Log at a given level (log/trace/debug/info/warn/error) to the console
* Disable logging at any level (eg. disable all but error in production by setting log level to error)
* Default log level is ```info```
* Fallback to ```console.log``` if more specific ones aren't available eg: ```trace``` is not available in ```IE9```
* Supports all standard JavaScript loading systems (CommonJS, AMD, or global)
* Extensible (using decorators)

**Tech**
* ```ES6-7``` Supported
* ```ESLint and Flow``` Check enabled
* Testing and Code Coverage using ```Mocha, Sinon, Chai and Istanbul```

Installation
----
**NPM**

```npm install clogy```

**CDN**

* ```Development```:

**rawgit**: ```//rawgit.com/pgmanutd/clogy/1.1.0/lib/clogy.js```

or

**unpkg**: ```//unpkg.com/clogy@1.1.0/lib/clogy.js```

* ```Production```:

**rawgit**: ```//cdn.rawgit.com/pgmanutd/clogy/1.1.0/lib/clogy.min.js```

or

**unpkg**: ```//unpkg.com/clogy@1.1.0/lib/clogy.min.js```


Usage
----
clogy supports AMD (e.g. RequireJS), CommonJS (e.g. NodeJS) and direct usage (e.g. loading globally (available as ```clogy```) with a ```<script>``` tag):

#### CommonsJS (e.g. NodeJS)
```
const clogy = require('clogy');
clogy.info('Hello World');
```

#### AMD (e.g. RequireJS)
```
define(['clogy'], (clogy) => {
  clogy.info('Hello World again');
});
```

#### Direct Usage
```
<script src="clogy.min.js"></script>
<script>
  clogy.info('Hello script tag');
</script>
```

Documentation
----

### Properties:

* ```LEVELS```: Different log levels (along with values); use them to set the current log level. Order goes from top to bottom.
  * ```log```: 1
  * ```trace```: 2
  * ```debug```: 3
  * ```info```: 4
  * ```warn```: 5
  * ```error```: 6
  * ```none```: 7 (if current level is none, it won't log anything)

   If current log level is ```info```, then all the levels below ```info``` are valid and rest are invalid. It means ``` clogy.info()```, ```clogy.warn()``` and ```clogy.error()``` will work but ```clogy.log()```, ```clogy.trace()``` and ```clogy.debug()``` won't.

   For example:
   ```
   clogy.LEVELS.log; // 1
   clogy.LEVELS.error; // 7
   ```

### Methods:

* ```noConflict```: If you are using another JavaScript library that uses the clogy variable, you can run into conflicts with this library. In order to avoid these conflicts, you need to put clogy in no-conflict mode immediately after it is loaded onto the page and before you attempt to use clogy in your page. It works similar to jQuery's no-conflict mode.

  For example:
  ```
  const logger = clogy.noConflict();
  logger.info('Still working');
  ```

* ```setOptions```: (```getOptions()``` not required) Used for setting options (```showDateTime``` and ```prefix```)

  For example:
  ```
  clogy.setOptions({
    showDateTime: true,
    prefix: 'Github-'
  });
  ```

  where,

  * ```showDateTime```: It will prepend date and time along with ```:```
    * **Type**: Boolean
    * **Default**: false

    For example:
    ```
    clogy.setOptions({
      showDateTime: true
    });
    clogy.info('Hello World'); // Wed Jul 27 2016 17:35:54.452: Hello World
    ```
  * ```prefix```: It will prepend a prefix. It will come after date and time (if enabled)
    * **Type**: String
    * **Default**: '' (Emtpy)

    For example:
    ```
    clogy.setOptions({
      showDateTime: true,
      prefix: 'Github-'
    });
    clogy.info('Hello World'); // Wed Jul 27 2016 17:35:54.452: Github- Hello World
    ```

* ```getLevel```: Returns current log level; Default is ```info```

  For example:
  ```
  clogy.getLevel(); // 4 for info and so on
  ```

* ```setLevel```: Set current log level

  For example:
  ```
  clogy.setLevel(1); // log; number type argument
  clogy.setLevel(clogy.LEVELS.log); // log; enum type argument
  clogy.setLevel('log'); // log; string type argument
  ```

* ```enableAllLevels```: Enable all levels; equivalent to ```clogy.setLevel(clogy.LEVELS.log)```

  For example:
  ```
  clogy.enableAllLevels();
  ```

* ```disableAllLevels```: Disable all levels; equivalent to ```clogy.setLevel(clogy.LEVELS.none)```

  For example:
  ```
  clogy.disableAllLevels();
  ```

* ```decorator```: Used to extend logging functionality. Can be used for:
  * Adding a prefix
  * Submitting logs to server
  * Logging to a file
  * Showing toast messages

  For example:
  ```
  clogy.log('Hello World'); // Hello World

  clogy.decorator((originalLogger) => {
    // Extending log method; you can extend any method
    // (log/trace/debug/info/warn/error)
    const originalLog = originalLogger.log;

    // Don't use arrow functions here, because they will
    // bind themselves to window or undefined in strict mode
    originalLogger.log = function() {

      // Please don't call clogy.log here, it will create a
      // circular reference and throws
      // "RangeError: Maximum call stack size exceeded" error
      originalLog.apply(this, ['Github-', ...arguments]);
    };
  });

  clogy.log('Hello World'); // Github- Hello World
  ```

#### Logging Methods:
(Default to ```log```, if not available eg: ```trace``` is not available in ```IE9```)

* ```log```: It will print log message

    For example:
    ```
    clogy.log('Hello World'); // Hello World
    ```

* ```trace```: It will print trace message

    For example:
    ```
    clogy.trace('Hello World'); // Hello World
                                 u                      @ clogy.min.js:1
                                 (anonymous function)   @ clogy.min.js:1
                                 p.(anonymous function) @ clogy.min.js:1
                                 (anonymous function)   @ VM188:1
    ```
* ```debug```: It will print debug message

    For example:
    ```
    clogy.debug('Hello World'); // Hello World
    ```

* ```info```: It will print info message

    For example:
    ```
    clogy.info('Hello World'); // Hello World
    ```

* ```warn```: It will print warn message

    For example:
    ```
    clogy.warn('Hello World'); // Hello World
    ```

* ```error```: It will print error message

    For example:
    ```
    clogy.error('Hello World'); // Hello World
                                 u                      @ clogy.min.js:1
                                 (anonymous function)   @ clogy.min.js:1
                                 p.(anonymous function) @ clogy.min.js:1
                                 (anonymous function)   @ VM188:1
    ```

Want to contribute?
----
Anyone can help make this project better - check out the [Contributing guide](https://github.com/pgmanutd/clogy/blob/master/CONTRIBUTING.md)!

Changelog
----
[Here it is](https://github.com/pgmanutd/clogy/blob/master/CHANGELOG.md)!

License
----
Copyright (c) 2016 pgmanutd

Licensed under the MIT license


**Free Software, Hell Yeah!**
