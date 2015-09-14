"use strict";

var co = require('co');
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
chai.use(sinonChai);

var api_router = require('./api_router')

describe('module api_router', function() {
  var spies;
  var mock_info_router;
  var mock_article_router;
  var mock_router;

  beforeEach(function() {
    spies = {
      router: {
        use: sinon.stub(),
        routes: sinon.stub()
      }
    };

    mock_info_router = 'fake info router';
    mock_article_router = 'fake article router';

    mock_router = function router() {
      this.opts = arguments[0]
      this.use = spies.router.use.returns(this);
      this.routes = spies.router.routes.returns(this);
    };
  });

  describe('exports', function() {
    it('injects router and info_router', function() {
      expect(api_router.$inject).to.deep.equal([
        'router',
        'article_router',
        'info_router'
      ]);
    });

    it('is named api_router', function() {
      expect(api_router.name).to.equal('api_router');
    });
  });

  describe('router', function() {
    var res;
    var routes;

    beforeEach(function() {
      res = api_router(mock_router, mock_article_router, mock_info_router);
      routes = new mock_router();
    });

    it('is a router', function() {
      expect(res).to.be.an.instanceof(mock_router);
    });

    it('has the prefix /api/v1', function() {
      expect(res).to.have.deep.property('opts.prefix','/api/v1')
    });

    it('mounts info_router onto /info', function() {
      expect(spies.router.use).to.have.been.calledWith(
        '/info',
        mock_info_router);
    });

    it('mounts article_router onto /article', function() {
      expect(spies.router.use).to.have.been.calledWith(
        '/article',
        mock_article_router);
    });

  });
});
