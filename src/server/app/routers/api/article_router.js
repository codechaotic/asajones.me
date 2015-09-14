module.exports = article_router;

article_router.$inject = [
  'router',
  'body',
  'article_model'
];

/**
* Router for handling API requests for articles
*
* @method article_router
* @param {Koa_Router Instance} router
* @param {Koa_Body Instance} body
* @param {Object} article_model
* @return {Object} Returns a configured router middleware
*/
function article_router(router, body, article_model) {

  var OK = 200;
  var BAD_REQUEST = 400;
  var NOT_FOUND = 404;
  var INTERNAL_SERVER_ERROR = 500;

  function success(data) {
    this.body = JSON.stringify({
      success: true,
      data: data
    });
    this.status = OK;
  }

  function badRequest() {
    this.body = JSON.stringify({
      success: false,
      error: 'bad request'
    });
    this.status = BAD_REQUEST;
  }

  function serverError(err) {
    this.body = JSON.stringify({
      success: false,
      error: err
    });
    this.status = INTERNAL_SERVER_ERROR;
  }

  function notFound() {
    this.body = JSON.stringify({
      success: false,
      error: 'not found'
    });
    this.status = NOT_FOUND;
  }

  function* processRequest(gen, next) {
    try {
      this.response.type = 'application/json';
      if(this.accepts('application/json')) {
        var data = yield gen.call(this);
        if(data) success.call(this, data);
        else notFound.call(this);
      }
      else badRequest.call(this);
    }
    catch(err) {
      serverError.call(this, err);
    }
    finally {
      yield* next;
    }
  }

  return new router()
    .get('/list', function* (next) {
      yield* processRequest.call(this,
        function*() {
          return yield article_model.list();
        },
        next
      );
    })
    .post('/create', body, function*(next) {
      yield* processRequest.call(this,
        function*() {
          var raw = this.request.body;
          return yield article_model.create(raw);
        },
        next
      );
    })
    .get('/id/:id', function* (next) {
      yield* processRequest.call(this,
        function*(ctx) {
          var id = this.params.id;
          return yield article_model.getByID(id);
        },
        next
      );
    })
    .put('/id/:id', body, function* (next) {
      yield* processRequest.call(this,
        function*(ctx) {
          var id = this.params.id;
          var raw = this.request.body;
          return yield article_model.setByID(id, raw);
        },
        next
      );
    })
    .delete('/id/:id', function* (next) {
      yield* processRequest.call(this,
        function*(ctx) {
          var id = this.params.id;
          return yield article_model.delByID(id);
        },
        next
      );
    })
    .routes();
}
