(function() {

  //@autoinject
  exports.api_router = function(router, comment_router) {
    var api_router = new router()
    return api_router
      .use('/comment', comment_router)
      .routes()
  }

})()
