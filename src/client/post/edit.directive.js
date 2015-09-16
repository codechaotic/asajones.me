module.exports = postEdit;

postEdit.$inject = [];
function postEdit() {
  return {
    restrict: 'E',
    controller: 'EditController',
    controllerAs: 'editCTRL',
    template: require('./edit.template.html')
  };
}
