(function() {
  "use strict";

  var gulp = require('gulp'),
      nop = require('gulp-nop'),
      plumber = require('gulp-plumber'),
      Q = require('q'),
      //config
      pat = require('../config/pat'),
      loc = require('../config/loc')

  module.exports = function() {
    var deferred = Q.defer()
    gulp.src( loc.src.server + pat.all )
      .pipe(plumber(deferred.reject))
      .pipe(gulp.dest(loc.dest_dir))
      .on('end',deferred.resolve)
    return deferred.promise
  }

})();
