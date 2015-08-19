module.exports = options_router;

options_router.$inject = ['router', 'body', 'options_model'];
function options_router(router, body, options_model) {
  var options = new router();
  return options
    .get('/', function*() {
      var comments = yield options_model.list();
      this.body = JSON.stringify(comments);
    })
    .routes();
}
