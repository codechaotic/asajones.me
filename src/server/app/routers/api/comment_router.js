(function() {

  //@autoinject
  exports.comment_router = function(router, body, comment_model) {
    var comment_router    = new router()
    return comment_router
      .get('/', GetAllComments)
      .post('/', body, CreateComment)
      .routes()
  }

  function* GetAllComments() {
    var comments = yield comment_model.list()
    this.body = JSON.stringify(comments)
  }

  function* CreateComment() {
    var result = yield comment_model.create(this.request.body)
    this.body = JSON.stringify(result)
  }

})()
