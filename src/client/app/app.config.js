module.exports = AppConfig;

AppConfig.$inject = [
  '$stateProvider',
  '$locationProvider',
  '$compileProvider'
];

function AppConfig($stateProvider,$locationProvider,$compileProvider) {

  $stateProvider
    .state('root', {
      url: "/",
      controller: require('./route/root.controller'),
      controllerAs: 'route',
      template: require('./route/root.template.html')
    })
    .state('viewPost', {
      url: "/blog/view/:id",
      controller: require('./route/post/single.controller'),
      controllerAs: 'route',
      template: require('./route/post/single.template.html')
    })

  $locationProvider.html5Mode(true);
  $compileProvider.debugInfoEnabled(false);
}
