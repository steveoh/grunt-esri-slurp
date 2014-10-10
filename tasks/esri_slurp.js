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
  beautify = require('js-beautify').js_beautify,
  beautify_css = require('js-beautify').css,
  mkdirp = require('mkdirp'),
  os = require('os'),
  request = require('request'),
  S = require('string'),
  ProgressBar = require('progress'),

  unwind = require('./unwinder');

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

    var packageLocation = this.files[0].dest;

    packageLocation = S(packageLocation).ensureRight(path.sep).s;

    grunt.log.subhead('downloading and processing esri version ' + options.version);

    mkdirp.sync(packageLocation);

    var esriVersionBaseUrl = 'http://js.arcgis.com/' + options.version;
    if(+options.version > 3.10){
     esriVersionBaseUrl += 'amd/esri/';
    }
    else{
      esriVersionBaseUrl += 'amd/js/esri/';
    }

    grunt.verbose.writeln('esri base url: ' + esriVersionBaseUrl);

    var esriModules = require('./esriModules-' + options.version);

    var bar = new ProgressBar('[:bar] :percent remaining: :etas elapsed: :elapseds', {
      total: esriModules.length,
      stream: process.stdout,
      width: 30
    });

    async.eachLimit(esriModules, 20, function(file, callback) {
      var subPath = S(path.dirname(file)).ensureRight('/').s,
        fileFolder = path.join(packageLocation, subPath),
        fileName = path.basename(file),
        httpUrl = esriVersionBaseUrl + subPath + fileName;

      if (!fs.existsSync(fileFolder)) {
        mkdirp.sync(fileFolder);
      }

      request({
          uri: httpUrl,
          encoding: 'binary'
        },
        function(error, response, body) {
          if (body.length < 1) {
            bar.total = bar.total - 1;

            callback(error, body);

            return;
          }

          var newFile = path.join(packageLocation, file);

          var extension = path.extname(file);
          if (extension === '.js' || extension === '.css') {
            body = unwind(body);

            if (options.beautify) {
              try {
                if (extension === '.js') {
                  body = beautify(body);
                } else if (extension = '.css') {
                  body = beautify_css(body);
                }
              } catch (e) {
                grunt.log.warn(os.EOL + 'error beautifying: ' + file + ' ' + e);
                // swallow it's not the end of the world if it's not beautiful
              }
            }
          }

          fs.writeFile(newFile, body, 'binary');

          bar.tick();

          callback(error, body);
        });
    }, function(err) {
      if (err) {
        grunt.fail.warn(err);
      }

      done();
    });
  });
};