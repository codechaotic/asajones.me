module.exports = PostViewController;

PostViewController.$inject = ['Post'];
function PostViewController(Post) {
  var vm = this;

  init();

  function init() {
    vm.post = Post.get({id: vm.id});
  }

}
