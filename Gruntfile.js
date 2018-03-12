'use strict';

module.exports = function(grunt) {

  // Global configuration
  var _config = {
    srcDir:  'test/src',
    instDir: 'test/src-cov'
  };

  // Project configuration
  grunt.initConfig({
    sourceDir: _config.srcDir,
    instrumentedDir: _config.instDir,

    coffeecov: {
      run: {
        src:  '<%= sourceDir %>',
        dest: '<%= instrumentedDir %>'
      },
      covVar: {
        options: {
          coverageVar: '_$cov'
        },
        src:  '<%= sourceDir %>',
        dest: '<%= instrumentedDir %>'
      },
      initfile: {
        options: {
          initfile: '<%= instrumentedDir %>/coverage.js'
        },
        src:  '<%= sourceDir %>',
        dest: '<%= instrumentedDir %>'
      },
      exclude: {
        options: {
          exclude: [
            'exclude.coffee',
            'exclude'
          ]
        },
        src:  '<%= sourceDir %>',
        dest: '<%= instrumentedDir %>'
      },
      abbr: {
        options: {
          path: 'abbr'
        },
        src:  '<%= sourceDir %>',
        dest: '<%= instrumentedDir %>'
      },
      relative: {
        options: {
          path: 'relative'
        },
        src:  '<%= sourceDir %>',
        dest: '<%= instrumentedDir %>'
      }
    },

    clean: {
      cov: [
        '<%= instrumentedDir %>'
      ],
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

