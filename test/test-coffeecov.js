var chai = require('chai')
  , expect = chai.expect
  , should = chai.should()
  , chaiFS = require('chai-fs')
  , grunt = require('grunt')
  , fs = require('fs');

chai.use(chaiFS);

function checkSrc() {
  expect("test/src/test.coffee").to.be.a.file().and.not.empty;
  expect("test/src/exclude.coffee").to.be.a.file().and.not.empty;
  expect("test/src/exclude/file.coffee").to.be.a.file().and.not.empty;
}

function checkCov(variable, exclude) {
  if(!variable) {
    variable = "_$jscoverage";
  }

  expect("test/src-cov/test.js").to.be.a.file().and.not.empty;
  content = fs.readFileSync('test/src-cov/test.js', 'utf8');
  content.should.have.string(variable + '["test.coffee"]');

  if(exclude) {
    expect("test/src-cov/exclude.js").to.not.be.a.path();
    expect("test/src-cov/exclude/file.js").to.not.be.a.path();
  } else {
    expect("test/src-cov/exclude.js").to.be.a.file().and.not.empty;
    expect("test/src-cov/exclude/file.js").to.be.a.file().and.not.empty;
  }
}

describe("Grunt CoffeeCov", function() {

  beforeEach(function(done) {
    checkSrc();
    grunt.util.spawn({ grunt: true, args: ['clean:cov'] }, function() {
      done();
    });
  });

  it("default configuration", function(done) {
    var child = grunt.util.spawn({ grunt: true, args: ['coffeecov:run'] }, function() {
      checkCov();
      done();
    });
  });

  it("change coverage variable", function(done) {
    var child = grunt.util.spawn({ grunt: true, args: ['coffeecov:covVar'] }, function() {
      checkCov("_$cov");
      done();
    });
  });

  it("create initfile", function(done) {
    var child = grunt.util.spawn({ grunt: true, args: ['coffeecov:initfile'] }, function() {
      checkCov();
      expect("test/src-cov/coverage.js").to.be.a.file().and.not.empty;
      done();
    });
  });

  it("exclude some file and folder", function(done) {
    var child = grunt.util.spawn({ grunt: true, args: ['coffeecov:exclude'] }, function() {
      checkCov(null, true);
      done();
    });
  });

  it("relative option", function(done) {
    var child = grunt.util.spawn({ grunt: true, args: ['coffeecov:relative'] }, function() {
      checkCov();

      content = fs.readFileSync('test/src-cov/exclude/file.js', 'utf8');
      content.should.have.string('_$jscoverage["exclude/file.coffee"]');

      done();
    });
  });

});