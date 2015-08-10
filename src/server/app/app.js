(function() {

  var serve           = require('koa-static'),
      koa             = require('koa')

  //@autoinject
  exports.app = function(config, api_router) {
    var app = koa()

    app.use(serve(config.public_dir))
    app.use(api_router)

    app.listen(config.port)
  }

})()
