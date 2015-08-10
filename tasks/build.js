(function() {
  "use strict";

  var gulp              = require('gulp')
  var Q                 = require('q')
  //  tasks
  var buildClient       = require('./build/client')
  var buildServer       = require('./build/server')

  module.exports = function() {
    return Q.all([
      buildClient(),
      buildServer()
    ])
  }

})()
