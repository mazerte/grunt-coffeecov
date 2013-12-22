'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    coffeecov: {
      run: {
        src: 'test/src',
        dest: 'test/src-cov'
      },
      covVar: {
        options: {
          coverageVar: "_$cov"
        },
        src: 'test/src',
        dest: 'test/src-cov'
      },
      initfile: {
        options: {
          initfile: "test/src-cov/coverage.js"
        },
        src: 'test/src',
        dest: 'test/src-cov'
      },
      exclude: {
        options: {
          exclude: [
            "exclude.coffee",
            "exclude"
          ]
        },
        src: 'test/src',
        dest: 'test/src-cov'
      },
      relative: {
        options: {
          path: 'relative'
        },
        src: 'test/src',
        dest: 'test/src-cov'
      }
    },

    clean: {
      cov: ['test/src-cov'],
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/test-*.js']
      }
    }

  });

  // Load local tasks.
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task.
  grunt.registerTask('default', ['coffeecov']);
  grunt.registerTask('test', ['mochaTest']);

};
