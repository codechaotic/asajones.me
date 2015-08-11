(function() {
  "use strict";

  var gulp = require('gulp')
      //tasks
  var buildServer = require('../build/server')
      //config
  var pat = require('../config/pat')
  var loc = require('../config/loc')

  var log = require('../custom/log')

  module.exports = function() {
    return buildServer()
      .then(function() {
        gulp.watch(loc.src.server + pat.all, function(event) {
          log.info(event.path)
          buildServer()
        })
      })
  }

})()
