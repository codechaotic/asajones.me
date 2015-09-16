module.exports = postArchive;

postArchive.$inject = [];
function postArchive() {
  return {
    restrict: 'E',
    controller: 'PostController',
    controllerAs: 'postCTRL',
    template: require('./archive.template.html')
  };
}
