/*
 * grunt-esri-slurp
 * https://github.com/steveoh/grunt-esri-slurp
 *
 * Copyright (c) 2014 steveoh
 * Licensed under the MIT license.
 */

'use strict';

var version = '3.13';
var bumpFiles = [
  'package.json'
];

module.exports = function(grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

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
    clean: {
      tests: ['tmp', 'src']
    },
    esri_slurp: {
      options: {
        version: version
      },
      dev: {
        options: {
          beautify: true
        },
        dest: 'src/esri'
      },
      travis: {
        dest: 'src/esri'
      }
    },
    nodeunit: {
      tests: ['test/*_test.js']
    },
    bump: {
      options: {
        files: bumpFiles,
        commitFiles: bumpFiles.concat('README.md'),
        push: false
      }
    },
    debug: {
      options: {
        open: true
      }
    }
  });

  grunt.loadTasks('tasks');

  grunt.registerTask('test', ['clean', 'jshint', 'nodeunit']);

  grunt.registerTask('default', ['jshint', 'esri_slurp:dev']);

  grunt.registerTask('travis', ['jshint', 'esri_slurp:travis', 'nodeunit']);
};
