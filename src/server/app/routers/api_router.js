module.exports = api_router;

api_router.$inject = [
  'router',
  //'article_router',
  'info_router'
  //'page_router'
];

function api_router(router, info_router ) {
  var api = new router({ prefix: '/api/v1' });
  return api
    .use('/info', info_router)
    //.use('/article', article_router)
  //  .use('/page', page_router)
    .routes();
}
