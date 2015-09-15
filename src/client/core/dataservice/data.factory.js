module.exports = dataFactory;

dataFactory.$inject = ['$http'];
function dataFactory($http) {
  return {
    createPost: createPost,
    listPosts: listPosts
  };

  function createPost(post) {
    return $http.post('/api/v1/post/create', post)
      .then(function(res) {
        if(res.data.success) return res.data.data;
      })
      .catch(function(err) {
        console.log('error posting data');
      });
  }

  function listPosts() {
    return $http.get('/api/v1/post/list')
      .then(function(res) {
        return res.data.data;
      })
      .catch(function(err) {
        console.log('error retrieving data');
      });

  }

}
