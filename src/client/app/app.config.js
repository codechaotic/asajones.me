module.exports = AppConfig;

AppConfig.$inject = [
  '$locationProvider',
  '$compileProvider'
];

function AppConfig($locationProvider, $compileProvider) {
  $locationProvider.html5Mode(true);
  $compileProvider.debugInfoEnabled(false);
}
