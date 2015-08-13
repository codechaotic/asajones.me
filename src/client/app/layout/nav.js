(function() {
  'use strict';

  module.exports = angular.module( 'app.nav', [
    'ngRoute'
  ] )
    .config(require('./nav.config.js'))
    .controller('NavExampleController', require('./nav/example.controller'));

})();
