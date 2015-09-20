var BlogModule = angular.module( 'app.blog', [ ]);

BlogModule
  .config(require('./blog.config.js'));

module.exports = BlogModule;
