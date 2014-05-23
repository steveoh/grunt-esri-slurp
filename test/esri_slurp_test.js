'use strict';

var grunt = require('grunt');
var unwind = require('../tasks/unwinder.js');
/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
  
    test.ifError(value)
*/

exports.regular_expression = {
  setUp: function(done){
    done();
  },
  split_requires: function(test){
    var actual = grunt.file.read('test/expected/wound_define');
    actual = unwind(actual);
    var expected = grunt.file.read('test/expected/unwound_define');

    test.equal(actual, expected, 'should split requires');

    test.done();
  }
};
// exports.esri_slurp = {
//   setUp: function(done) {
//     // setup here if necessary
//     done();
//   },
//   default_options: function(test) {
//     test.expect(1);

//     var actual = grunt.file.read('tmp/default_options');
//     var expected = grunt.file.read('test/expected/default_options');
//     test.equal(actual, expected, 'should describe what the default behavior is.');

//     test.done();
//   },
//   custom_options: function(test) {
//     test.expect(1);

//     var actual = grunt.file.read('tmp/custom_options');
//     var expected = grunt.file.read('test/expected/custom_options');
//     test.equal(actual, expected, 'should describe what the custom option(s) behavior is.');

//     test.done();
//   },
// };
