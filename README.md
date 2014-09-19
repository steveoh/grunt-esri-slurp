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
        version: '3.10'
      },
      dev: {
        options: {
          beautify: true
        },
        dest: 'src/esri'
      },
      travis: {
        dest: 'src/esri'
      }
    }
  });

  grunt.loadNpmTasks('grunt-esri-slurp');

  grunt.registerTask('slurp', ['esri_slurp:dev']);
  grunt.registerTask('travis', ['esri_slurp:travis']);
};
```

### Options

#### options.version
Type: `String`
Default value: `null`

A string value representing the version of the esri js api to download.

#### options.beautify
Type: `Boolean`
Default value: `false`

A boolean value to make the js and css code beautiful.

### Files

#### files.dest
Type: `String`
Default value: `null`

A string value letting grunt know where to put the downloaded files.

## Examples

For examples for working with `grunt-esri-slurp` please browse the [AGRC JavaScript BoilerPlate]() project as well as [@TomWayson](https://github.com/tomwayson)'s simple [slurp example](https://github.com/tomwayson/esri-slurp-example).

## Release History
**1.0.0** changed `packageLocation` -> `dest` and removed default value. This follows the grunt conventions and makes slurp work with other plugins like `grunt-if-missing`. Removed the default value for the `version` property. Added css beautification.

**0.6.0** esri_slurp is now a [multi-task](http://gruntjs.com/api/grunt.task#grunt.task.registermultitask) in order to have target level options.

**0.5.0** Added js-beautify option. esriModuleBuilder task now works on windows. `3.10` module list now in plugin.

**0.4.0**: Added progress bar and task to build module list. Stored 3.8 and 3.9 modules by default. Anything earlier and you'll have to run it yourself.

**0.3.0**: Fixed async code and should now run on multiple os's.

**0.2.0**: Split up the defines so packages can be required again.

**0.1.0**: Can download modules to a specified location.

## License
Copyright (c) 2014 steveoh. Licensed under the MIT license.
