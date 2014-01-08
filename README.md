Grunt CoffeeCov
===============

[![Dependency Status](https://gemnasium.com/mazerte/grunt-coffeecov.png)](https://gemnasium.com/mazerte/grunt-coffeecov)
[![Build Status](https://travis-ci.org/mazerte/grunt-coffeecov.png?branch=master)](https://travis-ci.org/mazerte/grunt-coffeecov)
[![Code Climate](https://codeclimate.com/github/mazerte/grunt-coffeecov.png)](https://codeclimate.com/github/mazerte/grunt-coffeecov)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

[![NPM](https://nodei.co/npm/grunt-coffeecov.png?downloads=true&stars=true)](https://nodei.co/npm/grunt-coffeecov/) 

Grunt CoffeeCov is a Grunt task wrapper for [CoffeeCoverage](https://github.com/benbria/coffee-coverage). [CoffeeCoverage](https://github.com/benbria/coffee-coverage) compile .coffee files to .js files and adds [JSCoverage](http://siliconforks.com/jscoverage/) style instrumentation for the original [CoffeeScript](http://coffeescript.org/).

For more information, I recommend to consult the readme of [Benbria CoffeeScript](https://github.com/benbria/coffee-coverage);

Installation
------------

```shell
npm install grunt-coffeecov --save-dev
```

```coffeescript
# Gruntfile.coffee
grunt.loadNpmTasks('grunt-coffeecov')
```

Usage
-----

Create a `coffeecov` section in your Gruntfile

```coffeescript
# Gruntfile.coffee
grunt.initConfig
  coffeecov:
    cov:
      src: 'src/coffee'
      desc: 'lib-cov'
```

Example with some options

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
      desc: 'lib-cov'
```

You can find a real example in [Footguard](https://github.com/mazerte/generator-footguard), it's a [Yeoman](http://yeoman.io) generator for create a single page application with CoffeeScript, Sass, Backbone and Require. [Test-footguard](https://github.com/mazerte/test-footguard) is out of box project generated with [Footguard](https://github.com/mazerte/generator-footguard), you can read the `Gruntfile` and try the project. 

If you use [Mocha](http://visionmedia.github.io/mocha/) for your tests, I recommend to use [grunt-phantom-coverage-reporter](https://github.com/mazerte/mocha-phantom-coverage-reporter). It's fully compatible with this tasks and coveralls.

Options
-------

### Data

#### src

type: `String`

Path to source folder

#### desc

type: `String`

Path to destination folder

### Options

#### coverageVar

type: `String` - default: `_$jscoverage`

By default, coffeecoverage will instrument source files with the global variable "_$jscoverage". This is done to mimic JSCoverage. You can rename this variable by using this option

#### initfile

type: `String`

Specifies an "initfile" which all global initalization is written to. This is handy for testing with mocha. If you require the initfile, then mocha reports will show coverage of all files in your project, even files which were never required anywhere.

#### exclude

type: `Array` - default: `['node_modules', '.git']`

Gives a comma delimited list of files and directories to exclude from processing. This defaults to `['node_modules', '.git']`, since neither of these are directories you probably want to be instrumenting. If you want to also exclude your "test" directory, you might run coffeeCoverage with: `['node_modules', '.git', 'test']`

#### path

type: `String` - default: `none`

Path can be given one of three different parameters:

 - `none` is the default - if coffeeCoverage reads a file from "src/models/user.coffee", then
   the instrumented code will use the filename "user.coffee".  This works well provided you
   don't reuse filenames elsewhere in your code.  Note that if there is a name collision between
   two files in different subdirectories, coffeecoverage will append a something to the
   end of one to make it unique, otherwise coverage data from one file would interfere with data
   from another.
 - `abbr` will use abbreviated path names; a file from "src/models/user.coffee" will be
   instrumented as "s/m/user.coffee".
 - `relative` will use the full relative pathname; "src/models/user.coffee".

Paths are always relative to the `src` directory provided on grunt task.

Thanks
------

Thanks to [Benbria](https://github.com/benbria) to [CoffeeCoverage](https://github.com/benbria/coffee-coverage)
