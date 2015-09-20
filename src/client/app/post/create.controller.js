module.exports = PostCreateController;

PostCreateController.$inject = ['Post'];
function PostCreateController(Post) {
  var vm = this;

  init()

  function init() {
    vm.post = {};
  }

  vm.save = function() {
    var post = vm.post;
    
    post.tags = post.tags
      .split(',')
      .map(function(tag) {
        return tag.trim()
      })
      .filter(function(tag,pos,arr) {
        return arr.indexOf(tag) == pos;
      });

    Post.save(post);

    init();
  };
}
