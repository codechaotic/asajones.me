module.exports = angular.module( 'app.post.list', [ ])
  .directive('postList', require('./list.directive'))
  .controller('PostListController', require('./list.controller'));
