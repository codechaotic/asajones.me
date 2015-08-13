(function() {
  "use strict";

  var gulp = require('gulp')
  var gutil = require('gulp-util')
  var Q = require('q')
  var webpack = require('webpack')
  var url = require('url')
  var fs = require('fs')
  var crypto = require('crypto')
  var path = require('path')
  //  config
  var loc = require('../config/loc')
  var pat = require('../config/pat')
  var pkg = require('../../package.json')

  var log = require('../custom/log')

  var webpack_config = require(loc.src.client + '/webpack.config')(pkg.version)

  module.exports = function() {
    var deferred        = Q.defer()
    var config          = Object.create(webpack_config)
    config.output.path  = loc.pub_dir
    var compiler = webpack(config)
    compiler.run(function(err, stats) {
      if(err) deferred.reject(log.fatal(err))
      var jsonStats = stats.toJson();
      if(jsonStats.errors.length > 0) log.error(jsonStats.errors)
      if(jsonStats.warnings.length > 0) log.warn(jsonStats.warnings)
      log.info(stats.toString({colors: true}))
      jsonStats.assets.forEach(function(asset) {
        var parse = url.parse(asset.name)
        var basename = path.basename(parse.pathname)
        var dirname = path.dirname(parse.pathname)
        var filepath = path.join(loc.pub_dir, parse.pathname)
        var hashpath = path.join(loc.pub_dir, dirname, basename+'+HASH')
        var contents = fs.readFileSync(filepath)
        var hash = crypto.createHash('md5').update(contents).digest('hex')
        fs.writeFileSync(hashpath,hash)
        deferred.resolve()
      })
    })
    return deferred.promise
  }

})();
