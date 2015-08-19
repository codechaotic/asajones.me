module.exports = app;

app.$inject = ['koa', '_conf', 'staticfiles', 'api_router'];
function app(koa, _conf, staticfiles, api_router) {
  var server = koa();
  server.use(staticfiles());
  server.use(api_router);
  server.listen(_conf.port);
  console.log('app started on port %s',_conf.port);
}
