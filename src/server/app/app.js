module.exports = app;

app.$inject = [
  'koa',
  'conf',
  'static_middleware',
  'api_router'
];

function app(koa, conf, static_middleware, api_router) {
  var server = koa();
  server.use(static_middleware);
  server.use(api_router);
  server.listen(conf.port);
  console.log('app started on port %s',conf.port);
}
