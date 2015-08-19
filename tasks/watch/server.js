var Q = require('q');
var webpack = require('webpack');
var nodemon = require('nodemon');
var log = require('../lib/logger');

module.exports = function() {
  var deferred = Q.defer();
  var compiler = webpack(Object.create(require('../config/server.webpack')));
  compiler.watch({
    aggregateTimeout: 300,
    poll: true
  }, function(err, stats) {
    if(err) deferred.reject(log.fatal(err));
    var jsonStats = stats.toJson();
    if(jsonStats.errors.length > 0) log.error(jsonStats.errors);
    if(jsonStats.warnings.length > 0) log.warn(jsonStats.warnings);
    log.info(stats.toString({colors: true}));
    nodemon.restart();
    deferred.resolve();
  })
  return deferred.promise;
}
