require('./app.less');

var AppModule = angular.module( 'app', [
  'ui.router',
  require('./data/data.module').name,
  require('./page/page.module').name,
  require('./post/post.module').name,
  require('./blog/blog.module').name
]);

AppModule
  .config(require('./app.config'));

module.exports = AppModule;
