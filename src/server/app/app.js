(function() {
  "use strict";

  var koa             = require('koa')

  //@autoinject
  exports.app = function(config, api_router) {
    var app = koa()

    app.use(require('./middleware/serve'))

    //app.use(api_router)

    app.listen(config.port)
  }

})()
