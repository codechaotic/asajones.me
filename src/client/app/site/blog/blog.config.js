module.exports = BlogConfig;

BlogConfig.$inject = [
  '$stateProvider'
];

function BlogConfig($stateProvider) {
  $stateProvider
    .state('blog', {
      abstract: true,
      parent: 'site',
      url: '/blog',
      template: require('./blog.template.html')
    })
    .state('blog.summary', {
      url: '/',
      template: require('./summary.template.html')
    })
    .state('blog.post', {
      url: '/post/:id',
      controller: require('./single.controller'),
      controllerAs: 'ctrl',
      template: require('./single.template.html')
    });
}
