var Q = require('q');
var gulp = require('gulp');
var jasmine = require('gulp-jasmine');

var log = require('./lib/logger');

module.exports = function() {
  return gulp.src('src/**/*_spec.js')
        .pipe(jasmine());
}
