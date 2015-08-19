module.exports = app;

app.$inject = ['koa', 'conf', 'staticfiles', 'api_router'];
function app(koa, conf, staticfiles, api_router) {
  var server = koa();
  server.use(staticfiles);
  server.use(api_router);
  server.listen(conf.port);
  console.log('app started on port %s',conf.port);
}
