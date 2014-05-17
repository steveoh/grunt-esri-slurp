# esri-slurp

> download esri js api amd modules and create a package

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install esri-slurp --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('esri-slurp');
```

## The "esri_slurp" task

### Overview
In your project's Gruntfile, add a section named `esri_slurp` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  esri_slurp: {
    options: {
      version: '3.9',
      packageLocation: 'src/esri'
    },
  },
})
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
**0.1.0**: Download modules to location

## License
Copyright (c) 2014 steveoh. Licensed under the MIT license.
