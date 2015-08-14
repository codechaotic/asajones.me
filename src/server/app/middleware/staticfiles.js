(function() {
  "use strict";

  var send = require('koa-send')

  //@autoinject
  exports.staticfiles = function(config) {
    var publicDir = process.cwd()+config.public_dir
    return function() {
      return function*(next) {
        if(this.method == 'HEAD' || this.method == 'GET'){
          var filepath = yield send(this, this.path, {
            root: publicDir,
            index: 'index.html'
          });
          if(filepath) {
            var file = filepath.substr(publicDir.length+1).replace('.gz','')
            this.set('Etag',config.hashes[file])
            if(filepath.match(/\.html$/)) {
              this.set('Cache-Control', 'max-age=86400000, must-revalidate')
            }
            else this.set('Cache-Control', 'max-age=31536000000')
            if (this.fresh) this.status = 304;
          }
        }
        yield* next;
      }
    }
  }

})()
