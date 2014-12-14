/*
 * grunt-esri-slurp
 * https://github.com/steveoh/grunt-esri-slurp
 *
 * Copyright (c) 2014 steveoh
 * Licensed under the MIT license.
 */

'use strict';
var esrislurp = require('esrislurp'),
  ProgressBar = require('progress');

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

    function onError(error){
      grunt.log.error("Unable to slurp Esri JS API: ", error);
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
};
