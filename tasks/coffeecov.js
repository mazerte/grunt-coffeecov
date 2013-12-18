var CoverageInstrumentor = require('coffee-coverage').CoverageInstrumentor;

module.exports = function(grunt) {

	grunt.registerMultiTask('coffeecov', 'Compile CoffeeScript to Javascript Coverage', function() {

		var options = this.options({});

		var coverageInstrumentor = new CoverageInstrumentor({});
		try {

			var result = coverageInstrumentor.instrument(this.data.src, this.data.dest, {});
			grunt.log.ok("Annotated " + result.lines + " lines.");

		} catch(err) {
			if (err.constructor.name === "CoverageError") {
				grunt.log.error("Error: " + err.message);
			}
			throw err;
		}
	});

};