var koa = require('koa');

module.exports = [
  'config',
  'staticfiles',
  function(config, staticfiles) {
    var app = koa();
    app.use(staticfiles());
    app.listen(config.port);
    console.log('app started on port %s',config.port);
  }
];
