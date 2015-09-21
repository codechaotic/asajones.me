module.exports = sideBar;

sideBar.$inject = [];
function sideBar() {
  return {
    restrict: 'A',
    controller: require('./sidebar.controller'),
    controllerAs: 'ctrl',
    bindToController: true,
    template: require('./sidebar.template.html')
  };
}
