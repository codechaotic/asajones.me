module.exports = angular.module( 'app.post.form', [ ])
  .directive('postCreate', require('./form.directive'))
  .controller('PostFormController', require('./form.controller'));
