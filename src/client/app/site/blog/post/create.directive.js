module.exports = postCreate;

postCreate.$inject = [];
function postCreate() {
  return {
    restrict: 'A',
    scope: {
      id: '@postCreate'
    },
    controller: require('./create.controller'),
    controllerAs: 'Create',
    bindToController: true,
    template: require('./create.template.html')
  };
}
