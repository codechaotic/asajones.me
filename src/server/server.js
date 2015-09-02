var Zeninjector = require('zeninjector');
var zen = new Zeninjector();

zen.registerAndExport('body',   require('koa-body'));
zen.registerAndExport('crypto', require('crypto'));
zen.registerAndExport('fs',     require('fs'));
zen.registerAndExport('glob',   require('glob'));
zen.registerAndExport('koa',    require('koa'));
zen.registerAndExport('pkg',    require('package.json'));
zen.registerAndExport('path',   require('path'));
zen.registerAndExport('robe',   require('robe'));
zen.registerAndExport('router', require('koa-router'));
zen.registerAndExport('send',   require('koa-send'));

requireAll(require.context('./app/', true, /^(?:.{0,4}|.*(?!_spec).{5})\.js$/));

zen.resolve('app');

function requireAll(r) {
  r.keys().forEach(function(t) {
    var mod = r(t);
    var name = mod.name || mod._name_;
    if(!name) throw new Error('Unnamed dependency in module %s', t);
    if(mod.$inject) mod.$inject.push(mod);
    zen.register(name,mod);
  });
}
