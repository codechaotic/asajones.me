var PageModule = angular.module( 'app.page', [ ]);

PageModule
  .config(require('./page.config.js'));

module.exports = PageModule;
