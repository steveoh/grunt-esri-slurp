/*
 * grunt-esri-slurp
 * https://github.com/steveoh/grunt-esri-slurp
 *
 * Copyright (c) 2014 steveoh
 * Licensed under the MIT license.
 */

'use strict';
var walk = require('walk'),
    S = require('string'),
    async = require('async'),
    fs = require('fs'),
    path = require('path'),
    Handlebars = require('handlebars'),
    model = {
        files: []
    };

module.exports = function(grunt) {
    grunt.registerTask('esri_slurp_modules', 'build module list', function() {
        var location = 'jsapi/3.8/js/esri',
            resolved = path.join('./', location),
            template = Handlebars.compile('module.exports = [{{#each files}}{{#if @index}},\n {{/if}}\'{{this}}\'{{/each}}];'),
            done = this.async();

        grunt.log.subhead('parsing: ' + resolved);

        // Walker options
        var walker = walk.walk(resolved, {
            followLinks: false
        });

        walker.on('file', function(root, stat, next) {
            // Add this file to the list of files
            var fileName = root + '/' + stat.name;
            var moduleName = S(fileName.replace(location, '')).chompLeft('/').s;

            model.files.push(moduleName);

            next();
        });

        walker.on('end', function() {
            var data = template(model);
            fs.writeFile(path.join('.', 'tasks', 'esriModules-3.8.js'), data, function(err) {
                if (err) {
                    grunt.fail.warn(err);
                }

                done();
            });
        });
    });
};