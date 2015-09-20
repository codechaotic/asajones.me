var DataModule = angular.module( 'app.data', [
  'ngResource'
]);

DataModule
  .factory('Post', require('./post.factory'));

module.exports = DataModule;
