module.exports = postEdit;

postEdit.$inject = [];
function postEdit() {
  return {
    restrict: 'E',
    controller: 'PostController',
    controllerAs: 'postCTRL',
    template: require('./edit.template.html')
  };
}
