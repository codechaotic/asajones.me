(function() {
  "use strict";

  //  package
  var cache = require('gulp-cache')
  //  system
  var crypto = require('crypto')
  var path = require('path')
  //  custom
  var log = require('./log')

  module.exports = function(cacheStream,namespace) {
    namespace = namespace || 'default'
    return cache(cacheStream, {
      name: namespace,
      key: function(file) {
        var key = file.stat.ctime.getTime()+file.path
        var hash = crypto.createHash('md5').update(key).digest('hex')
        cache.fileCache.getCached(namespace,hash,function(err,cached) {
          if(err) throw err
          var filestring = path.basename(file.path)
          if(cached) log.debug('Load File',namespace,filestring)
          else log.debug('Save File',namespace,filestring)
        })
        return key
      }
    })
  }
})();
