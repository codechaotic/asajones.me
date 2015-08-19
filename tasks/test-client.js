var Q = require('q');
var Server = require('karma').Server;

module.exports = function() {
  var deferred = Q.defer();
  var server = new Server({
    configFile: __dirname + '/config/client.karma.js',
    singleRun: true
  }, function(test_result) {
    deferred.resolve();
  })
  server.start()
  return deferred.promise;
}
