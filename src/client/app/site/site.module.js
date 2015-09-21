require('./site.style.less');

var SiteModule = angular.module( 'app.site', [
  require('./blog/blog.module').name
]);

SiteModule
  .config(require('./site.config.js'))
  .directive('sideBar', require('./sidebar.directive'));

module.exports = SiteModule;
