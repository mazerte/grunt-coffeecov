// eslint-env mocha

var
  chai = require('chai'),
  fs = require('fs'),
  grunt = require('grunt'),
  path = require('path');

chai.use(require('chai-fs'));
var
  expect = chai.expect,
  should = chai.should();    // eslint-disable-line no-unused-vars

/**
 *
 */
function checkSrc() {
  expect("test/src/test.coffee").to.be.a.file().and.not.empty;
  expect("test/src/exclude.coffee").to.be.a.file().and.not.empty;
  expect("test/src/exclude/file.coffee").to.be.a.file().and.not.empty;
}

/**
 * @param {string} givenPath - Pathname of file being instrumented
 * @param {string} [pathopt=none] - Value of 'options.path' setting
 */
function instrumentedPath(givenPath, pathopt) {
  var evaluatedPath = path.normalize(givenPath);
  if (path.isAbsolute(evaluatedPath)) {
    // Convert absolute pathname to root-relative form
    evaluatedPath = evaluatedPath.slice(1);
  }

  if (!pathopt) {
    pathopt = 'none';
  }

  switch (pathopt) {
    case 'abbr':
      var pathcomps = [];
      path.dirname(evaluatedPath).split('/').forEach(function (dir) {
        pathcomps.push(dir.charAt(0));
      });
      pathcomps.push(path.basename(evaluatedPath));
      return pathcomps.join('/');
      break;
    case 'relative':
      return evaluatedPath;
      break;
    default:
      return path.basename(evaluatedPath);
  }
}

/**
 * @param {string} [variable=_$jscoverage] - Value of 'options.coverageVar' setting
 * @param {boolean} [exclude=false] - Did the instrumentation exclude files?
 * @param {string} [pathopt=none] - Value of 'options.path' setting
 */
function checkCov(variable, exclude, pathopt) {
  if (!variable) {
    variable = '_$jscoverage';
  }

  if (!pathopt) {
    pathopt = 'none';
  }

  var sourceFile = 'test/src/test.coffee';
  var transpiledFile = 'test/src-cov/test.js';

  expect(transpiledFile).to.be.a.file().and.not.empty;
  content = fs.readFileSync(transpiledFile, 'utf8');

  var instPath = instrumentedPath(sourceFile, pathopt);
  content.should.have.string(variable + '["' + instPath + '"]');

  if (exclude) {
    expect('test/src-cov/exclude.js').to.not.be.a.path();
    expect('test/src-cov/exclude/file.js').to.not.be.a.path();
  }
  else {
    expect('test/src-cov/exclude.js').to.be.a.file().and.not.empty;
    expect('test/src-cov/exclude/file.js').to.be.a.file().and.not.empty;
  }
}


describe('Grunt CoffeeCov', function () {

  beforeEach(function (done) {
    checkSrc();
    grunt.util.spawn({ grunt: true, args: ['clean:cov'] }, function (error, result, code) {
      if (error) {
        grunt.log.error(error);
        done(error);
      }
      done();
    });
  });

  it('should run with default configuration', function (done) {
    grunt.util.spawn({ grunt: true, args: ['coffeecov:run'] }, function (error, result, code) {
      if (error) {
        grunt.log.error(error);
        done(error);
      }
      checkCov();
      done();
    });
  });

  it('should change the coverage variable', function (done) {
    grunt.util.spawn({ grunt: true, args: ['coffeecov:covVar'] }, function (error, result, code) {
      if (error) {
        grunt.log.error(error);
        done(error);
      }
      checkCov("_$cov");
      done();
    });
  });

  it('should create an initfile', function (done) {
    grunt.util.spawn({ grunt: true, args: ['coffeecov:initfile'] }, function (error, result, code) {
      if (error) {
        grunt.log.error(error);
        done(error);
      }
      checkCov();
      expect("test/src-cov/coverage.js").to.be.a.file().and.not.empty;
      done();
    });
  });

  it('should exclude some file and folder', function (done) {
    grunt.util.spawn({ grunt: true, args: ['coffeecov:exclude'] }, function (error, result, code) {
      if (error) {
        grunt.log.error(error);
        done(error);
      }
      checkCov(null, true);
      done();
    });
  });

  describe('when given alternate options to show path in instrumented output', function () {

    var variable = '_$jscoverage';
    var sourceDir = 'test/src/';
    var sourceFile = sourceDir + 'exclude/file.coffee';
    var transpiledFile = 'test/src-cov/exclude/file.js';

    it('should replace each directory with its first letter given "abbr"', function (done) {
      grunt.util.spawn({ grunt: true, args: ['coffeecov:abbr'] }, function (error, result, code) {
        if (error) {
          grunt.log.error(error);
          done(error);
        }
        var pathopt = 'abbr';
        checkCov(undefined, false, pathopt);
        content = fs.readFileSync(transpiledFile, 'utf8');
        var instPath = instrumentedPath(sourceFile, pathopt);
        content.should.have.string(variable + '["' + instPath + '"]');
        done();
      });
    });

    it('should use the file\'s relative path given "relative"', function (done) {
      grunt.util.spawn({ grunt: true, args: ['coffeecov:relative'] }, function (error, result, code) {
        if (error) {
          grunt.log.error(error);
          done(error);
        }
        var pathopt = 'relative';
        checkCov(undefined, false, pathopt);
        content = fs.readFileSync(transpiledFile, 'utf8');
        var instPath = instrumentedPath(sourceFile, pathopt);
        content.should.have.string(variable + '["' + instPath + '"]');
        done();
      });
    });
  });
});

