module.exports = postView;

postView.$inject = [];
function postView() {
  return {
    restrict: 'A',
    scope: {
      id: '@postView'
    },
    controller: require('./view.controller'),
    controllerAs: 'View',
    bindToController: true,
    template: require('./view.template.html')
  };
}
