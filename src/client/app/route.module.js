var RouteModule = angular.module( 'app.route', [
  'ui.router',
  require('./route/post.module').name
]);

RouteModule
  .controller('RouteRootController', require('./route/root.controller'));

module.exports = RouteModule;
