module.exports = EditController;

EditController.$inject = ['Post'];
function EditController(Post) {
  this.create = function(postData) {
    postData.tags = postData.tags.split(',')
    var post = new Post(postData);
    post.$save();
  }
}
