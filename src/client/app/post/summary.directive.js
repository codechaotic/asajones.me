module.exports = postSummary;

postSummary.$inject = [];
function postSummary() {
  return {
    restrict: 'E',
    controller: 'PostSummaryController',
    controllerAs: 'postSummaryCTRL',
    template: require('./summary.template.html')
  };
}
