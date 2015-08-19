require('harmonize')(['harmony-generators','harmony-scoping']);

var gulp = require('gulp')
var gulpdir = './tasks'

gulp.task('build-client', require(gulpdir+'/build-client'))
gulp.task('build-server', require(gulpdir+'/build-server'))

gulp.task('watch-client', require(gulpdir+'/watch-client'))
gulp.task('watch-server', require(gulpdir+'/watch-server'))

gulp.task('test-server', require(gulpdir+'/test-server'))
gulp.task('test-client', require(gulpdir+'/test-client'))

gulp.task('build',[
  'build-client',
  'build-server'
])

gulp.task('watch',[
  'watch-client',
  'watch-server'
])

gulp.task('test',[
  'test-server',
  'test-client'
])

gulp.task('run', [
    'watch'
], require(gulpdir+'/run'))
