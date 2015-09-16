module.exports = postArchive;

postArchive.$inject = [];
function postArchive() {
  return {
    restrict: 'E',
    controller: 'ArchiveController',
    controllerAs: 'archiveCTRL',
    template: require('./archive.template.html')
  };
}
