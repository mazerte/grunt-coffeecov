var CoverageInstrumentor = require('coffee-coverage').CoverageInstrumentor;
var path = require('path')
	, fs = require('fs')
  , mkdirs = require('coffee-coverage/lib/helpers').mkdirs;

module.exports = function(grunt) {

	grunt.registerMultiTask('coffeecov', 'Compile CoffeeScript to Javascript Coverage', function() {

    var done = this.async();

		var options = this.options({
      verbose: null,
      bare: null,
      coverageVar: '_$jscoverage',
      exclude: [ 'node_modules', '.git' ],
      initfile: null,
      path: 'none'
    });
    options.src = this.data.src;
    options.dest = this.data.dest;

		var coverageInstrumentor = new CoverageInstrumentor(options);
		try {
      if (options.initfile) {
        mkdirs(path.dirname(options.initfile));

        var stream = fs.createWriteStream(options.initfile);
        stream.on('end', function() {
          done();
        });

        options.initFileStream = stream;
      }

			var result = coverageInstrumentor.instrument(this.data.src, this.data.dest, options);

      if(options.initFileStream) {
        options.initFileStream.end();
      } else {
        done();
      }

			grunt.log.ok("Annotated " + result.lines + " lines.");

		} catch(err) {
			if (err.constructor.name === "CoverageError") {
				grunt.log.error("Error: " + err.message);
			}
			throw err;
		}
	});

};