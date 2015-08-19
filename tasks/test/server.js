var Q = require('q');
var glob = require('glob');
var Mocha = require('mocha');

module.exports = function() {
  var deferred = Q.defer();
  var mocha = new Mocha();
  glob.sync('src/server/**/*_spec.js').forEach(function(file) {
    mocha.addFile(file);
  })
  mocha.run(function(failed) {
    deferred.resolve();
  })
  return deferred.promise;
}
