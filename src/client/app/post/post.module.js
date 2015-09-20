var PostModule = angular.module( 'app.post', [ ]);

PostModule
  .directive('postView', require('./view.directive'))
  .directive('postCreate', require('./create.directive'))
  .directive('postList', require('./list.directive'));

module.exports = PostModule;
