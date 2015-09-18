var RoutePostModule = angular.module( 'app.route.post', [ ]);

RoutePostModule
  .controller('RoutePostSingleController', require('./post/single.controller'));

module.exports = RoutePostModule;
