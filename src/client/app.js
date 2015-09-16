require('./app.less');

var app = module.exports = angular.module( 'app', [
  require('./route').name,
  require('./post').name
] );

angular.element(document).ready(function () {
  angular.bootstrap(document, [app.name], {
    //strictDi: true
  });
});
