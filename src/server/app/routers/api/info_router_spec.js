"use strict";

var co = require('co');
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
chai.use(sinonChai);

var info_router = require('./info_router')

describe('module info_router', function() {
  var spies;
  var mock_router;
  var mock_pkg;
  var res;
  var routes;

  beforeEach(function() {
    spies = {
      router: {
        get: sinon.stub(),
        routes: sinon.stub()
      }
    }

    mock_router = function router() {
      this.mw = 'fakemw';
      this.get = spies.router.get.returns(this);
      this.routes = spies.router.routes.returns(this.mw);
    };

    mock_pkg = {
      version: 'tv',
      author: 'ta',
      name: 'tn'
    };
  });

  describe('exports', function() {
    it('injects router and pkg', function() {
      expect(info_router.$inject).to.deep.equal(['router', 'pkg']);
    });

    it('is named info_router', function() {
      expect(info_router.name).to.equal('info_router');
    });
  });

  describe('router', function() {
    var res;
    var routes;

    beforeEach(function() {
      res = info_router(mock_router, mock_pkg);
      routes = new mock_router();
    });

    it('is an instance of router', function() {
      expect(res).to.equal(routes.mw);
    });

    it('handles get requests to /', function() {
      expect(spies.router.get).to.have.been.calledWith('/');
    });

    describe('GET /', function() {
      var ctx;
      var fn;

      beforeEach(function() {
        ctx = {};
        var mw = spies.router.get.args[0][1];
        fn = co.wrap(mw);
      });

      it('sets result body to package info', function() {
        fn.call(ctx, function*() {})
        expect(ctx.body).to.exist;
        expect(JSON.parse(ctx.body)).to.deep.equal(mock_pkg);
      });
    });
  });
});
