var gulp                  = require('gulp'),

    build                 = require('./tasks/build')
    /*buildThemeCSS         = require('./tasks/build/theme-css'),
    buildClientApp        = require('./tasks/build/client-app'),
    buildClientHTML       = require('./tasks/build/client-html'),
    buildServer           = require('./tasks/build/server'),
    buildBowerFiles       = require('./tasks/build/bowerfiles'),

    watch                 = require('./tasks/watch'),
    watchThemeCSS         = require('./tasks/watch/theme-css'),
    watchClientApp        = require('./tasks/watch/client-app'),
    watchClientHTML       = require('./tasks/watch/client-html'),
    watchServer           = require('./tasks/watch/server'),
    watchBowerFiles       = require('./tasks/watch/bowerfiles'),

    clearAll              = require('./tasks/clear')*/

gulp.task('build', build)
/*gulp.task('build-theme-css', buildThemeCSS)
gulp.task('build-client-app', buildClientApp)
gulp.task('build-client-html', buildClientHTML)
gulp.task('build-server', buildServer)
gulp.task('build-bowerfiles', buildBowerFiles)

gulp.task('watch', watch)
gulp.task('watch-theme-css', watchThemeCSS)
gulp.task('watch-client-app', watchClientApp)
gulp.task('watch-client-html', watchClientHTML)
gulp.task('watch-server', watchServer)
gulp.task('watch-bowerfiles', watchBowerFiles)

gulp.task('clear', clearAll)
*/
