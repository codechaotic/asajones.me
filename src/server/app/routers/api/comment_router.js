module.exports = [
  'router',
  'body',
  'comment_model',
  function(router, body, comment_model) {
    var comment_router = new router();
    return comment_router
      .get('/', function*() {
        var comments = yield comment_model.list();
        this.body = JSON.stringify(comments);
      })
      .post('/', body, function*() {
        var result = yield comment_model.create(this.request.body);
        this.body = JSON.stringify(result);
      }
)
      .routes();
  }
];
