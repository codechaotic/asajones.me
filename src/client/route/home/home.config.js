module.exports = HomeConfig;

HomeConfig.$inject = ['$routeProvider','$locationProvider'];
function HomeConfig($routeProvider,$locationProvider) {
  $routeProvider
    .when('/', {
      controller: 'RouteHomeController',
      controllerAs: 'routeHomeCtrl',
      template: require('./home.template.html')
    });

  $locationProvider.html5Mode(true);
}
