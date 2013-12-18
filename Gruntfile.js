'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    coffeecov: {
      options: {
        path: 'relative',
        srcBasePath: 'test/src'
      },
      all: {
        src: 'test/src',
        dest: 'test/src-cov'
      }
    }
  });

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', ['coffeecov']);

};
