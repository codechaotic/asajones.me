var DataModule = angular.module( 'app.data', [
  'ngResource'
]);

DataModule
  .factory('Post', require('./data/post.factory'));

module.exports = DataModule;
