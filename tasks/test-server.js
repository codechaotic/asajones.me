var Q = require('q');
var gulp = require('gulp');
var Jasmine = require('jasmine');
var Reporter = require('jasmine-terminal-reporter');

var log = require('./lib/logger');

module.exports = function() {
  var deferred = Q.defer();
  var jasmine = new Jasmine();
  jasmine.addReporter(new Reporter({
    isVerbose: true,
    showColors: true,
    includeStackTrace: true
  }));
  jasmine.loadConfig({
    spec_dir: 'src/',
    spec_files: [
      'server/**/*_spec.js'
    ]
  });
  jasmine.onComplete(function(res) {
    deferred.resolve();
  });
  jasmine.execute();
  return deferred.promise;
}
