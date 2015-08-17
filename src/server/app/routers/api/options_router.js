module.exports = [
  'router',
  'body',
  'options_model',
  function(router, body, options_model) {
    var options_router = new router();
    return options_router
      .get('/', function*() {
        var comments = yield options_model.list();
        this.body = JSON.stringify(comments);
      })
      /*.post('/', body, function*() {
        var result = yield options.create(this.request.body);
        this.body = JSON.stringify(result);
      })*/
      .routes();
  }
];
