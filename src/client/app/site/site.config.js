module.exports = SiteConfig;

SiteConfig.$inject = [
  '$stateProvider'
];

function SiteConfig($stateProvider) {
  $stateProvider
    .state('site', {
      abstract: true,
      template: require('./site.template.html')
    })
    .state('home', {
      url: '/',
      parent: 'site',
      template: require('./home.template.html')
    });
}
