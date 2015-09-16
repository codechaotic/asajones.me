module.exports = post_router;

post_router.$inject = [
  'router',
  'body',
  'post_model'
];

/**
* Router for handling API requests for posts
*
* @method post_router
* @param {Koa_Router Instance} router
* @param {Koa_Body Instance} body
* @param {Object} post_model
* @return {Object} Returns a configured router middleware
*/
function post_router(router, body, post_model) {

  var OK = 200;
  var BAD_REQUEST = 400;
  var NOT_FOUND = 404;
  var INTERNAL_SERVER_ERROR = 500;

  function success(data) {
    this.body = JSON.stringify(data);
    this.status = OK;
  }

  function badRequest() {
    this.body = 'bad request';
    this.status = BAD_REQUEST;
  }

  function serverError(err) {
    this.body = JSON.stringify(err);
    this.status = INTERNAL_SERVER_ERROR;
  }

  function notFound() {
    this.body = 'not found';
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
    .get('/', function* (next) {
      yield* processRequest.call(this,
        function*() {
          return yield post_model.list();
        },
        next
      );
    })
    .post('/', body, function*(next) {
      yield* processRequest.call(this,
        function*() {
          var raw = this.request.body;
          return yield post_model.create(raw);
        },
        next
      );
    })
    .get('/:id', function* (next) {
      yield* processRequest.call(this,
        function*(ctx) {
          var id = this.params.id;
          return yield post_model.getByID(id);
        },
        next
      );
    })
    .put('/:id', body, function* (next) {
      yield* processRequest.call(this,
        function*(ctx) {
          var id = this.params.id;
          var raw = this.request.body;
          return yield post_model.setByID(id, raw);
        },
        next
      );
    })
    .delete('/:id', function* (next) {
      yield* processRequest.call(this,
        function*(ctx) {
          var id = this.params.id;
          return yield post_model.delByID(id);
        },
        next
      );
    })
    .routes();
}
