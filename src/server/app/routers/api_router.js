module.exports = api_router;

api_router.$inject = ['router', 'options_router'];
function api_router(router,options_router) {
  var api = new router();
  return api
    .use('/options', options_router)
    .routes();
}
