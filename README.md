# slurp-esri

> download esri js api amd modules and create a package

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install slurp-esri --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('slurp-esri');
```

## The "slurp_esri" task

### Overview
In your project's Gruntfile, add a section named `slurp_esri` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  slurp_esri: {
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

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  slurp_esri: {
    options: {},
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
**0.1.0**: Download modules to location

## License
Copyright (c) 2014 steveoh. Licensed under the MIT license.
