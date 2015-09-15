module.exports = postList;

postList.$inject = [];
function postList() {
  return {
    restrict: 'E',
    controller: 'PostListController',
    controllerAs: 'postListCTRL',
    template: require('./list.template.html')
  };
}
