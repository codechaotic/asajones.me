module.exports = AppController;

AppController.$inject = [
  '$location'
];

function AppController($location) {
  console.log('loading app controller');
  console.log($location.path())
}
