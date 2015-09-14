module.exports = api_router;

api_router.$inject = [
  'router',
  'article_router',
  'info_router'
];

function api_router(router, article_router, info_router ) {
  return new router({ prefix: '/api/v1' })
    .use('/info', info_router)
    .use('/article', article_router)
    .routes();
}
