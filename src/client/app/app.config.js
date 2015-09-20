module.exports = AppConfig;

AppConfig.$inject = [
  '$stateProvider',
  '$locationProvider',
  '$compileProvider'
];

function AppConfig($stateProvider, $locationProvider, $compileProvider) {

  $stateProvider
    .state('site', {
      template: require('./app.template.html')
    })

  $locationProvider.html5Mode(true);
  $compileProvider.debugInfoEnabled(false);
}
