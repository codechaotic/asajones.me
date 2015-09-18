module.exports = postArchive;

postArchive.$inject = [];
function postArchive() {
  return {
    restrict: 'A',
    scope: { },
    controller: require('./post.controller'),
    controllerAs: 'postCTRL',
    bindToController: true,
    template: require('./archive.template.html')
  };
}
