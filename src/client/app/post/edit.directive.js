module.exports = postEdit;

postEdit.$inject = [];
function postEdit() {
  return {
    restrict: 'A',
    scope: {
      id: '@postEdit'
    },
    controller: require('./post.controller'),
    controllerAs: 'postCTRL',
    bindToController: true,
    template: require('./edit.template.html')
  };
}
