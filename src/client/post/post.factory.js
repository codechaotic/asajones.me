module.exports = Post;

Post.$inject = ['$resource'];
function Post($resource) {
  return $resource('/api/v1/post/:id');
}
