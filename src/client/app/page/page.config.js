module.exports = PageConfig;

PageConfig.$inject = [
  '$stateProvider'
];

function PageConfig($stateProvider) {
  $stateProvider
    .state('site.homepage', {
      url: "/",
      template: require('./homepage.template.html')
    });
}
