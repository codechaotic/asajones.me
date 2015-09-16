module.exports = postSummary;

postSummary.$inject = [];
function postSummary() {
  return {
    restrict: 'E',
    controller: 'PostController',
    controllerAs: 'postCTRL',
    template: require('./summary.template.html')
  };
}
