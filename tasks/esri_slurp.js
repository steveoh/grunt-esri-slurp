/*
 * grunt-esri-slurp
 * https://github.com/steveoh/grunt-esri-slurp
 *
 * Copyright (c) 2014 steveoh
 * Licensed under the MIT license.
 */

'use strict';
var fs = require('fs'),
  path = require('path'),

  async = require('async'),
  mkdirp = require('mkdirp'),
  request = require("request"),
  S = require('string'),

  unwind = require('./unwinder'),
  esriModules = require('./esriModules');

module.exports = function(grunt) {
  grunt.registerTask('esri_slurp', 'download esri js api amd modules and create a package', function() {
    var options = this.options({
        packageLocation: 'src/esri/',
        version: '3.9'
      }),
      done = this.async();

    options.packageLocation = S(options.packageLocation).ensureRight('/').s;

    grunt.log.subhead('downloading esri version ' + options.version + ' modules');

    mkdirp.sync(options.packageLocation);

    var esriVersionBaseUrl = 'http://js.arcgis.com/' + options.version + 'amd/js/esri/';
    grunt.verbose.writeln('esri base url: ' + esriVersionBaseUrl);

    async.eachLimit(esriModules, 10, function(file, callback) {
      var subPath = file.substr(0, file.lastIndexOf('/') + 1),
        fileFolder = options.packageLocation + subPath,
        fileName = path.basename(file),
        httpUrl = esriVersionBaseUrl + subPath + fileName;

      if (!fs.existsSync(fileFolder)) {
        grunt.verbose.writeln(['creating folder ' + fileFolder]);

        mkdirp.sync(fileFolder);
      }

      grunt.verbose.writeln(['requesting ' + httpUrl]);

      request({
          uri: httpUrl,
          encoding: 'binary'
        },
        function(error, response, body) {
          if (body && body.length > 0) {
            grunt.verbose.or.write('.');
            grunt.verbose.writeln(['writing: ' + options.packageLocation + file]);

            var f = S(file);
            if (f.endsWith('.js') || f.endsWith('.css')) {
              body = unwind(body);
            }

            fs.writeFile(options.packageLocation + file, body, 'binary');
          }

          callback(error, body);
        });
    });
  });
};
