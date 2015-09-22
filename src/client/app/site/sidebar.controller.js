module.exports = SideBarController;

SideBarController.$inject = [
  '$state'
];

function SideBarController($state) {
  this.menu = [
    {
      ref: 'home',
      text: 'Home',
      active: stateIncludes('home')
    },
    {
      ref: 'blog.summary',
      text: 'Blog',
      active: stateIncludes('blog')
    }
  ];

  function stateIncludes(name) {
    return function() {
      return $state.includes(name);
    }
  }
}
