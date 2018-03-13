var
  fs = require('fs'),
  path = require('path');
var
  mkdirs = require('coffee-coverage/lib/utils/helpers').mkdirs,
  CoverageInstrumentor = require('coffee-coverage').CoverageInstrumentor;

module.exports = function (grunt) {

  grunt.registerMultiTask('coffeecov', 'Compile CoffeeScript to Javascript Coverage', instrument);

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
      path: 'none',
      verbose: null
    });
    options.src = this.data.src;
    options.dest = this.data.dest;
    options.basePath = path.resolve(options.basePath);

    var coverageInstrumentor = new CoverageInstrumentor(options);
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

      var result = coverageInstrumentor.instrument(this.data.src, this.data.dest, options);

      if (options.initFileStream) {
        options.initFileStream.end();
      }
      else {
        done();
      }

      grunt.log.ok('Instrumented ' + result.lines + ' lines.');

    }
    catch (err) {
      if (err.constructor.name === 'CoverageError') {
        grunt.log.error('Error: ' + err.message);
      }
      throw err;
    }
  }
};

