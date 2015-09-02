"use strict";

var co = require('co');
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
chai.use(sinonChai);

var info_router = require('./info_router')

describe('module info_router', function() {
  var mock_router;
  var mock_pkg;
  var spies;
  var res;
  var routes;

  beforeEach(function() {
    spies = {
      get: sinon.stub(),
      routes: sinon.stub()
    }

    mock_router = function router() {
      this.mw = 'fakemw';
      this.get = spies.get.returns(this);
      this.routes = spies.routes.returns(this.mw);
    };

    mock_pkg = {
      version: 'tv',
      author: 'ta',
      name: 'tn'
    };

    res = info_router(mock_router, mock_pkg);
    routes = new mock_router();
  });

  describe('exports', function() {
    it('injects router and pkg', function() {
      expect(info_router.$inject).to.deep.equal(['router', 'pkg']);
    });

    it('is named info_router', function() {
      expect(info_router.name).to.equal('info_router');
    });
  });

  describe('result', function() {
    it('is an instance of router', function() {
      expect(res).to.equal(routes.mw);
    });

    describe('endpoint \'/\'', function() {
      it('exists', function() {
        expect(spies.get).to.have.been.calledWith('/');
        expect(spies.get).to.have.been.calledBefore(spies.routes);
      });

      describe('middleware', function() {
        var ctx;

        beforeEach(function() {
          ctx = {};
          var fn = co.wrap(spies.get.args[0][1]);
          fn.call(ctx, function*() {});
        });

        it('sets result body to package info', function() {
          expect(ctx.body).to.exist;
          expect(JSON.parse(ctx.body)).to.deep.equal(mock_pkg);
        });
      });
    });
  });
});
