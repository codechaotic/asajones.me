module.exports = [
  'router',
  'options_router',
  function(router, options_router) {
    var api_router = new router();
    return api_router
      .use('/options', options_router)
      .routes();
  }
];
