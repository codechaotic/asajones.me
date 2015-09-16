module.exports = PostController;

PostController.$inject = ['dataservice'];
function PostController(dataservice) {
  var vm = this;
  vm.posts = [];

  this.getAll = function() {
    return dataservice.listPosts()
      .then(function(data) {
        vm.posts = data;
      })
      .catch(function(err) {
        console.log(err)
      })
  }

  this.create = function(post) {
    post.tags = post.tags.split(',')
    return dataservice.createPost(post)
      .then(function(data) {
        vm.posts.push(data)
      });
  }
}
