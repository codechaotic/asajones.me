module.exports = BlogConfig;

BlogConfig.$inject = [
  '$stateProvider'
];

function BlogConfig($stateProvider) {
  $stateProvider
    .state('site.blog', {
      template: require('./blog.template.html')
    })
    .state('site.blog.summary', {
      url: "/blog",
      template: require('./summary.template.html')
    })
    .state('site.blog.post', {
      url: "/blog/post/:id",
      controller: require('./single.controller'),
      controllerAs: 'ctrl',
      template: require('./single.template.html')
    });
}
