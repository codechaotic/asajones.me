(function() {
  'use strict';

  module.exports = Config;

  Config.$inject = ['$routeProvider','$locationProvider'];
  function Config($routeProvider,$locationProvider) {
    $routeProvider
      .when('/', {
        controller: 'NavExampleController',
        controllerAs: 'example',
        template: require('./nav/example.template.html')
      });

    $locationProvider.html5Mode(true);
  }

})();
