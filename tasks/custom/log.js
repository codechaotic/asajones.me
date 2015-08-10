(function() {
  "use strict";

  var gutil = require('gulp-util'),
      merge = require('merge'),
      util = require('util'),
      pad = require('pad/lib/colors'),

      columns = [8,8,12,52]

  // Logger methods should accept a string, watch event, or vinyl file
  module.exports = {
    debug:  createLogger('DEBUG:', ['blue', 'white', 'blue',    'white']),
    info:   createLogger('INFO: ', ['grey',  'white', 'green',   'white']),
    warn:   createLogger('WARN: ', ['yellow','white', 'yellow',  'white']),
    error:  createLogger('ERROR:', ['red',   'white', 'red',     'white'])
  }

  function createLogger(title,colors) {
    return function(action,type,msg) {
      gutil.log([title,action,type,msg].map(function(str,index) {
        return pad(gutil.colors[colors[index]].call(null,str),columns[index])
      }).join(''))
    }
  }

})();
