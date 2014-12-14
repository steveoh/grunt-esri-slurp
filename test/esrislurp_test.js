var path = require('path'),
    exec = require('child_process').exec,
    execOptions = {
      cwd: path.join(__dirname, '..')
    };

exports.tests = {
  dev: function(test) {
    test.expect(1);
    exec('grunt esri_slurp:dev', execOptions, function(error, stdout) {
      test.equal(
        stdout.indexOf('Done, without errors.') > -1,
        true,
        'esri_slurp:dev works'
      );
      test.done();
    });
  },
  travis: function(test) {
    test.expect(1);
    exec('grunt esri_slurp:travis', execOptions, function(error, stdout) {
      test.equal(
        stdout.indexOf('Done, without errors.') > -1,
        true,
        'esri_slurp:travis works'
      );
      test.done();
    });
  }
};
