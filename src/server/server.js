var Zeninjector = require('zeninjector');
var zen = new Zeninjector();
var path = require('path');

zen.registerAndExport('router',require('koa-router'));
zen.registerAndExport('body',require('koa-body'));

requireAll(require.context('./app/', true, /^(?:.{0,4}|.*(?!_spec).{5})\.js$/));

zen.resolve('app');

function requireAll(r) {
  r.keys().forEach(function(t) {
    var mod = r(t);
    var name = mod.name || path.basename(t,'.js');
    zen.register(name,mod);
  });
}
