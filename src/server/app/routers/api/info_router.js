module.exports = info_router;

info_router.$inject = ['router', 'pkg'];
function info_router(router, pkg) {
  return new router()
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
