/*
 * slurp-esri
 * github.com/steveoh/slurp-esri
 *
 * Copyright (c) 2014 steveoh
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp', 'src']
    },
    esri_slurp: {
    },
    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    },
    bump: {
      options: {
        pushTo: 'origin',
        commit: true
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-bump');


  grunt.registerTask('test', ['clean', 'jshint', 'nodeunit']);

  grunt.registerTask('default', ['jshint', 'esri_slurp']);

  grunt.registerTask('travis', ['jshint', 'esri_slurp', 'nodeunit']);
};