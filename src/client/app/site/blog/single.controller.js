module.exports = RoutePostSingleController;

RoutePostSingleController.$inject = [
  '$stateParams'
];

function RoutePostSingleController($stateParams) {
  this.id = $stateParams.id;
}
