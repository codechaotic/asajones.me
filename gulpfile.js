"use-strict";

require('harmonize')(['harmony-generators','harmony-scoping']);

var Q = require('q');
var gulp = require('gulp');

var gulpdir = './tasks';

var build = require(gulpdir+'/build');
var watch = require(gulpdir+'/watch');
var test = require(gulpdir+'/test');
var run = require(gulpdir+'/run');

gulp.task('build', build)
gulp.task('watch', watch)
gulp.task('test', test)
gulp.task('run', function() {
  return watch()
    .then(run)
})
