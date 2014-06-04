[![Build Status](https://travis-ci.org/steveoh/grunt-esri-slurp.svg?branch=master)](https://travis-ci.org/steveoh/grunt-esri-slurp)
[![Dependency Status](https://gemnasium.com/steveoh/grunt-esri-slurp.svg)](https://gemnasium.com/steveoh/grunt-esri-slurp)
[![NPM version](https://badge.fury.io/js/grunt-esri-slurp.svg)](http://badge.fury.io/js/grunt-esri-slurp)
# esri-slurp

> download esri js api amd modules to create a local package

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-esri-slurp --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-esri-slurp');
```

## The "esri_slurp" task

### Overview
In your project's Gruntfile, add a section named `esri_slurp` to the data object passed into `grunt.initConfig()`.

```js
module.exports = function (grunt) {
  grunt.initConfig({
    esri_slurp: {
      options: {
        version: '3.9',
        packageLocation: 'src/esri'
      }
    }
  });

  grunt.loadNpmTasks('grunt-esri-slurp');

  grunt.registerTask('slurp', ['esri_slurp']);
};
```

### Options

#### options.version
Type: `String`
Default value: `'3.9'`

A string value that is used to do something with whatever.

#### options.packageLocation
Type: `String`
Default value: `'src/esri'`

A string value that is used to do something else with whatever else.

## Release History
**0.4.0**: Added progress bar and task to build module list. Stored 3.8 and 3.9 modules by default. Anything earlier and you'll have to run it yourself.

**0.3.0**: Fixed async code and should now run on multiple os's.

**0.2.0**: Split up the defines so packages can be required again.

**0.1.0**: Can download modules to a specified location.

## License
Copyright (c) 2014 steveoh. Licensed under the MIT license.
