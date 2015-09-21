module.exports = postList;

postList.$inject = [];
function postList() {
  return {
    restrict: 'A',
    scope: { },
    controller: require('./list.controller'),
    controllerAs: 'List',
    bindToController: true,
    template: require('./list.template.html')
  };
}
