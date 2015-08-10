(function() {
  "use strict";

  var cache = require('gulp-cache');

  module.exports = function (callback) {
    return cache.clearAll(callback);
  }

})()
