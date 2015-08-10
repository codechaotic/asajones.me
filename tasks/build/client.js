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

  module.exports = function() {
    var deferred        = Q.defer()
    var config          = Object.create(webpack_config)
    config.context      = loc.src.client
    config.resolve.root = loc.src.client
    config.output.path  = loc.pub_dir
    webpack(config, function(err, stats) {
      if(err) deferred.reject(new gutil.PluginError("webpack", err))
      stats.toString({colors: true}).split('\n').forEach(function(x) {
        gutil.log(x)
      })
    })
    return deferred.promise
  }

})();
