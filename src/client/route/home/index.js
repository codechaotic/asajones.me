module.exports = angular.module( 'app.route.home', [ 'ngRoute' ])
  .config(require('./home.config'))
  .controller('RouteHomeController', require('./home.controller'));
