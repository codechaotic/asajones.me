(function() {
  'use strict';

  require('./style/style.less');

  module.exports = angular.module( 'app', [
    require('./layout/nav.js').name
  ] );

})();
