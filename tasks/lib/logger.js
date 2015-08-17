(function() {
  "use strict";

  var gutil = require('gulp-util'),
      pad = require('pad/lib/colors')

  module.exports = {
    debug:  createLogger('DEBUG:', 'blue'),
    info:   createLogger('INFO: ', 'grey'),
    warn:   createLogger('WARN: ', 'yellow'),
    error:  createLogger('ERROR:', 'red'),
    fatal:  createLogger('FATAL:', 'red', 1)
  }

  function createLogger(title,color,kill) {
    return function(msg) {
      if(Array.isArray(msg)) msg.forEach(function(m) {
        splitAndLog(m)
      })
      else if(msg) splitAndLog(msg)
      else splitAndLog('undefined')
      if(kill) process.exit(kill)
    }

    function splitAndLog(msg) {
      msg.split('\n').forEach(function(line) {
        gutil.log(pad(gutil.colors[color].call(null,title),8) + line.toString())
      })
    }
  }

})();
