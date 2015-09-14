module.exports = api_router;

api_router.$inject = [
  'router',
  'post_router',
  'info_router'
];

function api_router(router, post_router, info_router ) {
  return new router({ prefix: '/api/v1' })
    .use('/info', info_router)
    .use('/post', post_router)
    .routes();
}
