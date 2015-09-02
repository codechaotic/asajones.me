module.exports = info_router;

info_router.$inject = ['router', 'pkg'];
function info_router(router, pkg) {
  var options = new router();
  return options
    .get('/', function*(next) {
      this.body = JSON.stringify({
        name: pkg.name,
        version: pkg.version,
        author: pkg.author
      });
      yield* next;
    })
    .routes();
}
