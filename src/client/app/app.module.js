require('./app.style.less');

var AppModule = angular.module( 'app', [
  'ui.router',
  require('./data/data.module').name,
  require('./site/site.module').name
]);

AppModule
  .config(require('./app.config'));

module.exports = AppModule;
