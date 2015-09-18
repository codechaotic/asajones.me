var PostModule = angular.module( 'app.post', [ ]);

PostModule
  .controller('PostController', require('./post/post.controller'))
  .directive('postView', require('./post/view.directive'))
  .directive('postEdit', require('./post/edit.directive'))
  .directive('postSummary', require('./post/summary.directive'))
  .directive('postArchive', require('./post/archive.directive'));

module.exports = PostModule;
