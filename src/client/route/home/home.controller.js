module.exports = RouteHomeController;

RouteHomeController.$inject = ['$rootScope'];
function RouteHomeController($rootScope) {
  $rootScope.title = 'Home';
  this.title = 'homepage';
}
