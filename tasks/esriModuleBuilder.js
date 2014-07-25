/*
 * grunt-esri-slurp
 * https://github.com/steveoh/grunt-esri-slurp
 *
 * Copyright (c) 2014 steveoh
 * Licensed under the MIT license.
 * http://www.esri.com/apps/products/download/index.cfm?fuseaction=download.all#ArcGIS_API_for_JavaScript
 */

'use strict';
var walk = require('walk'),
    S = require('string'),
    async = require('async'),
    fs = require('fs'),
    path = require('path'),
    os = require('os'),
    Handlebars = require('handlebars'),
    model = {
        files: []
    };

module.exports = function(grunt) {
    grunt.registerTask('esri_slurp_modules', 'build module list', function() {
        var options = this.options({
            version: '3.10'
        });
        var location = path.join('jsapi', options.version, 'js', 'esri'),
            resolved = '.' + path.sep + location,
            template = Handlebars.compile('module.exports = [{{#each files}}{{#if @index}},\n {{/if}}\'{{this}}\'{{/each}}];'),
            done = this.async();

        grunt.log.subhead('parsing: ' + resolved);

        // Walker options
        var walker = walk.walk(resolved, {
            followLinks: false
        });

        var fix_windows = false;
        if (S(os.platform()).startsWith('win')) {
            fix_windows = true;
            grunt.verbose.writeln(['your on windows']);
        }

        walker.on('file', function(root, stat, next) {
            // Add this file to the list of files
            var fileName = path.join(root, stat.name);

            var moduleName = S(fileName.replace(location, '')).chompLeft(path.sep).s;

            if (fix_windows) {
                moduleName = S(moduleName).replaceAll(path.sep, '/');
                model.files.push(moduleName);
            }

            next();
        });

        walker.on('end', function() {
            var data = template(model);
            fs.writeFile(path.join('.', 'tasks', 'esriModules-' + options.version + '.js'), data, function(err) {
                if (err) {
                    grunt.fail.warn(err);
                }

                done();
            });
        });
    });
};