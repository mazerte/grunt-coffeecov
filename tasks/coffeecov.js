var
  fs = require('fs'),
  path = require('path');
var
  mkdirs = require('coffee-coverage/lib/utils/helpers').mkdirs,
  CoverageInstrumentor = require('coffee-coverage').CoverageInstrumentor;

module.exports = function (grunt) {

  var taskDescription = 'Compile CoffeeScript to Javascript with ' +
    'JSCoverage-compatible instrumentation for code coverage';
  grunt.registerMultiTask('coffeecov', taskDescription, instrument);

  // eslint-disable-next-line max-statements
  function instrument() {
    var done = this.async();

    var options = this.options({
      bare: null,
      basePath: process.cwd(),
      coverageVar: '_$jscoverage',
      exclude: [
        'node_modules',
        '.git'
      ],
      initfile: null,
      inst: 'jscoverage',
      path: 'none',
      verbose: null
    });
    options.src = this.data.src;
    options.dest = this.data.dest;
    options.basePath = path.resolve(options.basePath);

    var instrumentor = new CoverageInstrumentor(options);
    try {
      if (options.initfile) {
        mkdirs(path.dirname(options.initfile));

        var stream = fs.createWriteStream(options.initfile);
        stream.on('end', function () {
          done();
        });
        stream.on('close', function () {
          done();
        });

        options.initFileStream = stream;
      }

      var result = instrumentor.instrument(options.src, options.dest, options);

      if (options.initFileStream) {
        options.initFileStream.end();
      }
      else {
        done();
      }

      if (!result) {
        grunt.log.error(options.src + ' does not exist.');
      }
      else {
        grunt.log.ok('Instrumented ' + result.lines + ' lines.');
      }

    }
    catch (err) {
      if (err.constructor.name === 'CoverageError') {
        grunt.log.error('Error: ' + err.message);
        grunt.fatal(err);
      }
      throw err;
    }
  }
};

