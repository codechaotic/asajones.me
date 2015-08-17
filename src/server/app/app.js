var koa = require('koa');

module.exports = [
  'config',
  'staticfiles',
  'api_router',
  function(config, staticfiles, api_router) {
    var app = koa();
    app.use(staticfiles());
    app.use(api_router);
    app.listen(config.port);
    console.log('app started on port %s',config.port);
  }
];
