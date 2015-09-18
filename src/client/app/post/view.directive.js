module.exports = postView;

postView.$inject = [];
function postView() {
  return {
    restrict: 'A',
    scope: {
      id: '@postView'
    },
    controller: require('./post.controller'),
    controllerAs: 'postCTRL',
    bindToController: true,
    template: require('./view.template.html')
  };
}
