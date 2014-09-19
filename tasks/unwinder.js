/*
 * grunt-esri-slurp
 * https://github.com/steveoh/grunt-esri-slurp
 *
 * Copyright (c) 2014 steveoh
 * Licensed under the MIT license.
 */

'use strict';
var os = require('os');

module.exports = function(text) {

    if (text === null || text === '') {
        return;
    }

    if (text.replace) {
        text = text.replace(/dojo\/dijit\/themes/g, 'dijit/themes');
        text = text.replace(/dojo\/dojox\/grid\/resources\/images/g, 'dojox/grid/resources/images');
        text = text.replace(/dojo\/dojo\/resources\/images/g, 'dojo/resources/images');
        text = text.replace(/^\/\/>>built[\n\r]?require\([\s\S]*define\("/, 'define("');
    }

    var matches = /define\(\"(.*)\".split\("\s"\),[\n\r]?function([\s\S]*)/m.exec(text);

    if (matches === null || matches.length < 2) {
        return text;
    }

    var requireString = matches[1];

    var requireArgs = requireString.split(' ');

    requireArgs = requireArgs.map(function(arg) {
        return '"' + arg + '"';
    });

    var requires = requireArgs.join(',');

    var unwound = '//>>built' + os.EOL + 'define([' + requires + '],function' + matches[2];

    return unwound;
};