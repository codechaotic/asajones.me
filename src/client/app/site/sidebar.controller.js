module.exports = SideBarController;

SideBarController.$inject = [
  '$rootScope',
  '$state'
];

function SideBarController($rootScope, $state) {
  var vm = this;
  vm.state = $state.current.name;

  $rootScope.$on('$stateChangeSuccess', onStateChangeSuccess);

  function onStateChangeSuccess(e, toState, toParams, fromState, fromParams) {
    console.log("Transitioned to state %s with %s",toState.name, JSON.stringify(toParams));
    vm.state = toState.name;
  }
}
