module.exports = postForm;

postForm.$inject = [];
function postForm() {
  return {
    restrict: 'E',
    controller: 'PostFormController',
    controllerAs: 'postFormCTRL',
    template: require('./form.template.html')
  };
}
