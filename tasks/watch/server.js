(function() {
  "use strict";

  var gulp = require('gulp'),
      //tasks
      buildServer = require('../build/server'),
      //config
      pat = require('../config/pat'),
      loc = require('../config/loc')


  module.exports = function() {
    return buildServer()
      .then(function() {
        gulp.watch(loc.src.server + pat.all, ['build-server'])
      })
  }

})()
