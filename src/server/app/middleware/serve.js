(function() {
  "use strict";

  var send            = require('koa-send')
  var Stream          = require('stream')
  var crypto          = require('crypto')
  var fs              = require('mz/fs')

  var MS_1DAY = 1000*60*60*24
  var MS_1YEAR = MS_1DAY*365

  module.exports = function*(next) {
  if(this.method == 'HEAD' || this.method == 'GET'){
    var filepath = yield send(this, this.path, {
      root: process.cwd() + '/public',
      index: 'index.html',
      gzip: true
    });
    if(filepath) {
      var hash = yield fs.readFile(filepath+'+HASH');
      this.set('Etag',hash)
      if(filepath.match(/\.html$/)) {
        this.set('Cache-Control', 'max-age='+MS_1DAY+', must-revalidate')
      }
      else this.set('Cache-Control', 'max-age='+MS_1YEAR)
      if (this.fresh) this.status = 304;
    }
  }
  yield* next;
}

})()
