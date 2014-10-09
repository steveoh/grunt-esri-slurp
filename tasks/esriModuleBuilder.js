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
    os = require('os'),
    Handlebars = require('handlebars'),
    model = {
        files: []
    };

/*
    navigate to https://developers.arcgis.com/en/downloads/
    download the javascript api.
    navigate to arcgis_js_v311_api/arcgis_js_api/library/3.11/3.11/esri
    extract and make whatever changes you need to get to this format /jsapi/{version}/js/esri
    update the Gruntfile's version property
    then run grunt generate_list
*/
module.exports = function(grunt) {
    grunt.registerTask('esri_slurp_modules', 'build module list', function() {
        var options = this.options();
        var location = path.join('jsapi', options.version, 'js', 'esri'),
            resolved = '.' + path.sep + location,
            template = Handlebars.compile('module.exports = [{{#each files}}{{#if @index}},\n {{/if}}\'{{this}}\'{{/each}}];'),
            done = this.async();

        grunt.log.writeln('parsing: ' + resolved);

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
            grunt.log.debug(moduleName);
            if (fix_windows) {
                moduleName = S(moduleName).replaceAll(path.sep, '/');
            }

            model.files.push(moduleName);

            next();
        });

        grunt.log.ok();

        walker.on('end', function() {
            var data = template(model);
            var fileLocation = path.join('.', 'tasks', 'esriModules-' + options.version + '.js');
            grunt.log.writeln('writing modules: ' + fileLocation);

            fs.writeFileSync(fileLocation, data);

            grunt.log.ok();
            done();
        });
    });
};