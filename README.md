# Grunt CoffeeCov

[![Build Status](https://travis-ci.org/mazerte/grunt-coffeecov.png?branch=master)](https://travis-ci.org/mazerte/grunt-coffeecov)
[![Dependency Status](https://david-dm.org/mazerte/grunt-coffeecov.svg)](https://david-dm.org/mazerte/grunt-coffeecov)
[![devDependency Status](https://david-dm.org/mazerte/grunt-coffeecov/dev-status.svg)](https://david-dm.org/mazerte/grunt-coffeecov#info=devDependencies)
[![peerDependencies Status](https://david-dm.org/mazert/grunt-coffeecov/peer-status.svg)](https://david-dm.org/mazert/grunt-coffeecov?type=peer)
[![Coverage Status](https://img.shields.io/coveralls/mazerte/grunt-coffeecov.svg)](https://coveralls.io/r/mazerte/grunt-coffeecov)
[![Code Climate](https://codeclimate.com/github/mazerte/grunt-coffeecov.png)](https://codeclimate.com/github/mazerte/grunt-coffeecov)
[![Gitter](https://badges.gitter.im/mazerte/grunt-coffeecov.svg)](https://gitter.im/mazerte/grunt-coffeecov?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](https://gruntjs.com/)

**Grunt CoffeeCov** is a [Grunt][] task wrapper for [CoffeeCoverage][].
**CoffeeCoverage** compiles `.coffee` files to `.js` files and adds
[JSCoverage][] style instrumentation for the original [CoffeeScript][].

For more information, I recommend consulting the [CoffeeCoverage][] README.

[![NPM](https://nodei.co/npm/grunt-coffeecov.png?downloads=true&stars=true)](https://nodei.co/npm/grunt-coffeecov/) 

## Installation

```bash
$ npm install grunt-coffeecov --save-dev
```

```coffeescript
# Gruntfile.coffee
grunt.loadNpmTasks('grunt-coffeecov')
```

## Usage

Create a `coffeecov` section in your Gruntfile.

```coffeescript
# Gruntfile.coffee
grunt.initConfig
  coffeecov:
    cov:
      src: 'src/coffee'
      dest: 'lib-cov'
```

Example:

```coffeescript
# Gruntfile.coffee
grunt.initConfig
  coffeecov:
    options:
      path: 'relative'
    cov:
      options:
        initfile: 'lib-cov/coverage.js'
      src: 'src/coffee'
      dest: 'lib-cov'
```

You can find a real example in [Footguard][], a [Yeoman][] generator for
creating a single page application with CoffeeScript, Sass, Backbone and
Require. [Test-footguard][] is an "out of the box" project generated with
[Footguard][]; you can read the `Gruntfile` and try the project. 

If you use [Mocha][] for your tests, I recommend using
[grunt-phantom-coverage-reporter][]. It's fully compatible with this task
and [Coveralls][].

## Options

### Data

#### src

type: `String`

Path to source folder

#### dest

type: `String`

Path to destination folder

### Options

#### coverageVar

type: `String` - default: `'_$jscoverage'`

By default, **CoffeeCoverage** will instrument source files with the global
variable `_$jscoverage`. This is done to mimic [JSCoverage][]. You can rename
the variable using this option.

#### initfile

type: `String`

Specifies an "initfile" which all global initalization is written to. This is
handy for testing with [Mocha][]. If you require the initfile, then Mocha
reports will show coverage of all files in your project, even files which were
never required anywhere.

#### exclude

type: `Array` - default: `['node_modules', '.git']`

Specifies a comma-delimited list of files and directories to exclude from
processing. This defaults to `['node_modules', '.git']`, since neither of these
are directories you probably want to be instrumenting. If you want to also
exclude your "test" directory, you might run **CoffeeCoverage** with
`['node_modules', '.git', 'test']`.

#### path

type: `String` - default: `'none'`

Path can be given one of three different parameters:

 - `none` is the default - if **CoffeeCoverage** reads a file from
   "src/models/user.coffee", then the instrumented code will use the filename
   "user.coffee". This works well provided you don't reuse filenames elsewhere
   in your code.  Note that if there is a name collision between two files in
   different subdirectories, **CoffeeCoverage** will append a something to the
   end of one to make it unique, otherwise coverage data from one file would
   interfere with data from another.
 - `abbr` will use abbreviated path names; a file from
   "src/models/user.coffee" will be instrumented as "s/m/user.coffee".
 - `relative` will use the full relative pathname; "src/models/user.coffee".

Paths are always relative to the `src` directory provided on Grunt task.

## Thanks

Thanks to [Benbria][] for [CoffeeCoverage][].


[Grunt]: https://gruntjs.com/
[Benbria]: https://github.com/benbria/
[CoffeeCoverage]: https://github.com/benbria/coffee-coverage/
[JSCoverage]: https://siliconforks.com/jscoverage/
[CoffeeScript]: http://coffeescript.org/
[Mocha]: https://mochajs.org/
[Coveralls]: https://coveralls.io/
[Yeoman]: http://yeoman.io/
[Footguard]: https://github.com/mazerte/generator-footguard/
[Test-footguard]: https://github.com/mazerte/test-footguard/
[grunt-phantom-coverage-reporter]: https://github.com/mazerte/mocha-phantom-coverage-reporter/

