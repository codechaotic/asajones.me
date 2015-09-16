module.exports = postView;

postView.$inject = [];
function postView() {
  return {
    restrict: 'E',
    controller: 'PostController',
    controllerAs: 'postCTRL',
    template: require('./view.template.html')
  };
}
