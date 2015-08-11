var gulp                  = require('gulp')

gulp.task('build', require('./tasks/build'))
gulp.task('watch', require('./tasks/watch'))
gulp.task('pack', require('./tasks/package'))
