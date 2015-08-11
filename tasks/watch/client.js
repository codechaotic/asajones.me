(function() {
  "use strict";

  var gulp = require('gulp')
  var gutil = require('gulp-util')
  var Q = require('q')
  var webpack = require('webpack')
  //  config
  var loc = require('../config/loc')
  var pat = require('../config/pat')
  var webpack_config = require(loc.src.client + '/webpack.config')
  //custom
  var log = require('../custom/log')

  module.exports = function() {
    var deferred        = Q.defer()
    var config          = Object.create(webpack_config)
    config.context      = loc.src.client
    config.resolve.root = loc.src.client
    config.output.path  = loc.pub_dir
    var compiler = webpack(config)
    compiler.watch({
      aggregateTimeout: 300,
      poll: true
    }, function(err, stats) {
      if(err) deferred.reject(log.fatal(err))
      var jsonStats = stats.toJson();
      if(jsonStats.errors.length > 0) log.error(jsonStats.errors)
      if(jsonStats.warnings.length > 0) log.warn(jsonStats.warnings)
      log.info(stats.toString({colors: true}))
      deferred.resolve()
    })
    return deferred.promise
  }

})();
