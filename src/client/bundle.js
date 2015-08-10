(function() {
  'use strict';

  var appModule = require('./app/index');

  angular.element(document).ready(function () {
    angular.bootstrap(document, [appModule.name], {
      //strictDi: true
    });
  });

})();
