"use strict";

var co = require('co');
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;

chai.use(chaiAsPromised);
chai.use(sinonChai);

var article_router = require('./article_router')

describe('module article_router', function() {
  var spies;
  var mock_router;
  var mock_body;
  var mock_article_model;

  var NOOP_GENERATOR = (function*() {})();

  beforeEach(function() {
    spies = {
      router: {
        get: sinon.stub(),
        put: sinon.stub(),
        post: sinon.stub(),
        delete: sinon.stub(),
        routes: sinon.stub()
      },
      body: sinon.spy(),
      article_model: {
        create: sinon.stub(),
        list: sinon.stub(),
        delByID: sinon.stub(),
        getByID: sinon.stub(),
        setByID: sinon.stub()
      }
    }

    mock_router = function router() {
      this.opts = arguments[0]
      this.get = spies.router.get.returns(this);
      this.put = spies.router.put.returns(this);
      this.post = spies.router.post.returns(this);
      this.delete = spies.router.delete.returns(this);
      this.routes = spies.router.routes.returns(this);
    };

    mock_body = function* (next) {
      spies.body();
      yield* next;
    };

    mock_article_model = spies.article_model;
  });

  describe('exports', function() {
    it('injects router, body, and article_model', function() {
      expect(article_router.$inject).to.deep.equal([
        'router',
        'body',
        'article_model'
      ]);
    });

    it('is named article_router', function() {
      expect(article_router.name).to.equal('article_router');
    });
  });

  describe('router', function() {
    var res;

    beforeEach(function() {
      res = article_router(mock_router, mock_body, mock_article_model);
    });

    it('is a router', function() {
      expect(res).to.be.an.instanceof(mock_router);
    });

    describe('GET /list', function() {
      it('exists', function() {
        expect(spies.router.get).to.have.been.calledWith('/list');
      })
      it('uses article_model list()')
    })

    describe('POST /create', function() {
      it('exists', function() {
        expect(spies.router.post).to.have.been.calledWith('/create');
      })
      it('uses body middleware')
      it('uses article_model create()')
    })

    describe('GET /id/:id', function() {
      it('exists', function() {
        expect(spies.router.get).to.have.been.calledWith('/id/:id');
      })
      it('uses article_model getByID()')
    })

    describe('DELETE /id/:id', function() {
      it('exists', function() {
        expect(spies.router.delete).to.have.been.calledWith('/id/:id');
      })
      it('uses article_model delByID()')
    })

    describe('PUT /id/:id', function() {
      it('exists', function() {
        expect(spies.router.put).to.have.been.calledWith('/id/:id');
      })
      it('uses body middleware')
      it('uses article_model setByID()')
    })
  });
});
