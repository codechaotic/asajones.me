require('./app.less');

var AppModule = angular.module( 'app', [
  require('./data.module').name,
  require('./post.module').name,
  require('./route.module').name
] );

AppModule
  .config(require('./app.config'))
  .controller('AppController', require('./app.controller'));

module.exports = AppModule;
