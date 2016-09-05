# Contributing

Want to contribute? Great!

It uses Gulp + Webpack for fast developing.
Make a change in your file and instantaneously see your updates!

**If you have discovered a bug or have a feature suggestion, feel free to create an issue on Github**

## Tech

It uses a number of open source projects to work properly:

* [node.js] - evented I/O for the backend
* [Gulp] - the streaming build system
* [Webpack] - a module bundler

## Installation

You need Gulp installed globally:

```sh
$ npm install gulp -g
```

## Development

Fork https://github.com/pgmanutd/clogy.git

Open your favorite Terminal and run these commands:
```bash
git clone https://github.com/{{YOUR_USERNAME}}/clogy.git
cd clogy
npm install
gulp
```
A dist folder will be created (with clogy.js library)

When you are done with your changes:
```bash
npm run build
git branch -b "YOUR_BRANCH_NAME"
git add --all
git commit -a -m "commit message"
git push -u origin "YOUR_BRANCH_NAME"
```
and create a pull request from github


##### Please follow few guidelines before raising a PR

* Write tests and make sure all are passing
* Check for lint errors
* Follow the existing coding style
* Write a [good commit message](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)


## Important commands:

Show help:
```bash
$ gulp help
```

Run in Development mode (with watch):
```bash
$ gulp
```

Run in Development mode (without watch):
```bash
$ gulp --unwatch
```

Run in Production mode (without watch):
```bash
$ gulp --type=production
```

Run eslint on all js files:
```bash
$ gulp eslint
```

Run eslint on js file specified:
```bash
$ gulp eslint --file=src/test.js
```

Run flow check on all js files (having /* @flow */ comment at top of the file) :
```bash
$ gulp flow
```

Run unit tests, coverage using (mocha, chai, sinon), use .only for single test:
```bash
$ gulp test
```

Any one or more, default is PhantomJS:
```bash
$ gulp test --browsers=PhantomJS,Chrome,Firefox,IE
```

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [node.js]: <http://nodejs.org>
   [Gulp]: <http://gulpjs.com>
   [Webpack]: <https://webpack.github.io/>
