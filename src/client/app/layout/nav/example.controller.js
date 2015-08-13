(function() {
  'use strict';

  module.exports = NavExampleController;

  NavExampleController.$inject = ['$rootScope'];
  function NavExampleController($rootScope) {
    $rootScope.title = 'App-Example';
    this.title = 'test';
  }

})();
