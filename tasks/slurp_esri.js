/*
 * slurp-esri
 * github.com/steveoh/slurp-esri
 *
 * Copyright (c) 2014 steveoh
 * Licensed under the MIT license.
 */

'use strict';
var async = require('async'),
  fs = require('fs'),
  path = require('path'),
  mkdirp = require('mkdirp'),
  S = require('string'),
  request = require("request"),
  esriModules = require('./esriModules');

module.exports = function(grunt) {
  grunt.registerTask('slurp_esri', 'download esri js api amd modules and create a package', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
        packageLocation: './src/esri/',
        version: '3.9'
      }),
      done = this.async();

    options.packageLocation = S(options.packageLocation).ensureRight('/').s;

    grunt.log.writeln('version: ' + '3.9');
    grunt.log.writeln('package location: ' + options.packageLocation);

    mkdirp.sync(options.packageLocation);

    // App variables
    var esriVersionBaseUrl = 'http://js.arcgis.com/' + options.version + 'amd/js/esri/';
    grunt.verbose.writeln('esri base url: ' + esriVersionBaseUrl);

    async.eachLimit(esriModules, 10, function(file, callback) {
      var subPath = file.substr(0, file.lastIndexOf('/') + 1),
        fileFolder = options.packageLocation + subPath,
        fileName = path.basename(file),
        httpUrl = esriVersionBaseUrl + subPath + fileName;

      if (!fs.exists(fileFolder)) {
        mkdirp.sync(fileFolder);
      }

      grunt.log.writeln('requesting ' + httpUrl);

      request.get({
          url: httpUrl,
          encoding: 'binary'
        },
        function(error, response, body) {
          grunt.verbose.writeln('writing to: ' + options.packageLocation + file);

          if (body && body.length > 0) {
            grunt.log.writeln('writing ' + file);
            fs.writeFile(options.packageLocation + file, body, 'binary');
          }

          callback(error, body);
        },
        function(err) {
          // if any of the file processing produced an error, err would equal that error
          if (err) {
            // One of the iterations produced an error.
            // All processing will now stop.
            grunt.fail.warn('A file failed to process');
          }
        });
    });
  });
};