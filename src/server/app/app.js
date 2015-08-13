(function() {
  "use strict";

  var koa             = require('koa')
  var send            = require('koa-send')

  //@autoinject
  exports.app = function(config, api_router) {
    var app = koa()

    var publicDir = process.cwd()+config.public_dir

    app.use(function*(next) {
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
    })

    //app.use(api_router)

    app.listen(config.port)
  }

})()
