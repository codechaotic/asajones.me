module.exports = PostListController;

PostListController.$inject = ['dataservice'];
function PostListController(dataservice) {
  var vm = this;
  vm.posts = [];

  activate();

  function activate() {
    return getPosts().then(function() {
      console.log('activated');
    });
  }

  function getPosts() {
    return dataservice.listPosts()
      .then(function(data) {
        vm.posts = data;
      });
  }
}
