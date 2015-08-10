(function() {
  "use strict";

  var gulp              = require('gulp')
  var Q                 = require('q')
  //  tasks
  var watchClient       = require('./watch/client')
  var watchServer       = require('./watch/server')

  module.exports = function() {
    return Q.all([
      watchClient(),
      watchServer()
    ])
  }

})()
