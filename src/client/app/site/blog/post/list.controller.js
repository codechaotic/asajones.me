module.exports = PostListController;

PostListController.$inject = ['Post'];
function PostListController(Post) {
  var vm = this;

  init();
  
  function init() {
    vm.list = Post.query();
  }

}
