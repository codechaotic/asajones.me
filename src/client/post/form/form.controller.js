module.exports = PostFormController;

PostFormController.$inject = ['dataservice'];
function PostFormController(dataservice) {
  var vm = this;

  this.save = function(post) {
    post.tags = post.tags.split(',')
    console.log(post)
    return dataservice.createPost(post)
      .then(function(data) {
        console.log(data);
        vm.post = {}
      });
  }
}
