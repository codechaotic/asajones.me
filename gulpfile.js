var gulp = require('gulp')
require('harmonize')();
var gulpdir = './tasks'

gulp.task('build-client', require(gulpdir+'/build-client'))
gulp.task('build-server', require(gulpdir+'/build-server'))

gulp.task('watch-client', require(gulpdir+'/watch-client'))
gulp.task('watch-server', require(gulpdir+'/watch-server'))

gulp.task('test-server', require(gulpdir+'/test-server'))

gulp.task('build',[
  'build-client',
  'build-server'
])

gulp.task('watch',[
  'watch-client',
  'watch-server'
])

gulp.task('test',[
  'test-server'
])

gulp.task('run', [
    'watch'
], require(gulpdir+'/run'))
