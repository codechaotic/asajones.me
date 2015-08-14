(function() {
  "use strict";

  var koa             = require('koa')
  var send            = require('koa-send')

  //@autoinject
  exports.app = function(config, staticfiles, api_router) {
    var app = koa()

    app.use(staticfiles())
    app.listen(config.port)
  }

})()
