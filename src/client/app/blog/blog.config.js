module.exports = BlogConfig;

BlogConfig.$inject = [
  '$stateProvider'
];

function BlogConfig($stateProvider) {
  $stateProvider
    .state('site.blog', {
      url: "/blog/post/:id",
      controller: require('./single.controller'),
      controllerAs: 'ctrl',
      template: require('./single.template.html')
    });
}
