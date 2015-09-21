var BlogModule = angular.module( 'app.blog', [ ]);

BlogModule
  .config(require('./blog.config.js'))
  .directive('postView', require('./post/view.directive'))
  .directive('postCreate', require('./post/create.directive'))
  .directive('postList', require('./post/list.directive'));

module.exports = BlogModule;
