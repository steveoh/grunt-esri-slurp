/*
 * grunt-esri-slurp
 * https://github.com/steveoh/grunt-esri-slurp
 *
 * Copyright (c) 2014 steveoh
 * Licensed under the MIT license.
 */

'use strict';
var esrislurp = require('esrislurp'),
  ProgressBar = require('progress'),
  mb = require('esrislurp/esriModuleBuilder'),
  fs = require('fs'),
  mkdirp = require('mkdirp'),
  path = require('path'),
  async = require('async');

module.exports = function(grunt) {
  grunt.registerMultiTask('esri_slurp', 'download esri js api amd modules and create a package', function() {
    var options = this.options({
        version: null,
        beautify: false
      }),
      done = this.async();

    if (!options.version || !this.files[0].dest) {
      grunt.fail.warn('version option is required and the dest file property must be set on the target.');
    }

    function onSuccess(data) {
      grunt.log.ok();
      done();
    }

    function onError(error) {
      grunt.log.error('Unable to slurp Esri JS API: ', error);
      done(false);
    }

    var bar;

    function onProgress(progress) {
      if (!bar) {
        bar = new ProgressBar('[:bar] :percent remaining: :etas elapsed: :elapseds', {
          total: progress.total,
          stream: process.stdout,
          width: 30
        });
      }
      bar.tick();
    }

    grunt.log.subhead('downloading and processing esri version ' + options.version);

    esrislurp(this.files[0].dest, options.version, options.beautify, onSuccess, onError, onProgress);
  });

  grunt.registerTask('esri_slurp_modules', 'create the module list the esri download', function() {
    var options = this.options({
        version: null,
        src: null,
        dest: null
      }),
      done = this.async();

    if (!options.version || !options.src || !options.dest) {
      grunt.fail.warn('version option is required and the dest file property must be set on the target.');
    }
    grunt.log.ok();

    function onSuccess(data) {
      grunt.log.writeln();
      mkdirp.sync(options.dest);
      var location = path.join(options.dest, 'esriModules-' + options.version + '.js');
      grunt.log.write('creating ' + location);
      fs.writeFile(location, data, 'binary', function(err) {
        if (err) {
          grunt.log.error('Unable to save module list ', err);
        }
      });
      done();
    }

    function onError(error) {
      grunt.log.error('Unable to slurp Esri JS API into module list: ', error);
      done(false);
    }

    var bar;

    function onProgress(progress) {
      if (!bar) {
        bar = new ProgressBar('[:bar] :elapseds', {
          total: 2500, // TODO: just making this up for now
          stream: process.stdout,
          width: 25
        });
      }
      bar.tick();
    }

    grunt.log.subhead('Processing version ' + options.version);

    mb(options.src, options.version, onSuccess, onError, onProgress);
  });
};
