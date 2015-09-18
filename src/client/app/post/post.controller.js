module.exports = PostController;

PostController.$inject = ['Post'];
function PostController(Post) {
  var vm = this;
  vm.posts = [];

  this.getAll = function(){
    vm.posts = Post.query();
  };

  this.create = function(postData) {
    postData.tags = postData.tags.split(',');
    var post = new Post(postData);
    post.$save();
  };
}
