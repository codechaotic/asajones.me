module.exports = ArchiveController;

ArchiveController.$inject = ['Post'];
function ArchiveController(Post) {
  var vm = this;
  vm.posts = [];

  init();

  function init() {
    vm.posts = Post.query();
  }

}
