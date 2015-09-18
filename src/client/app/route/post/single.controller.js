module.exports = RoutePostSingleController;

RoutePostSingleController.$inject = [
  '$stateParams'
];

function RoutePostSingleController($stateParams) {
  this.params = $stateParams
}
