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
  var res;

  beforeEach(function() {
    mock_router = function router() {
      this.get = sinon.stub().returns(this);
      this.routes = sinon.stub().returns(this);
    };
    mock_pkg = {
      version: 'tv',
      author: 'ta',
      name: 'tn'
    };
    res = info_router(mock_router, mock_pkg);
  });

  describe('exports', function() {
    it('injects router and pkg', function() {
      expect(info_router.$inject).to.deep.equal(['router', 'pkg'])
    });

    it('is named info_router', function() {
      expect(info_router.name).to.equal('info_router')
    });

  });

  describe('result', function() {
    it('is an instance of router', function() {
      expect(res).to.be.an.instanceof(mock_router);
    });

    describe('endpoint \'/\'', function() {
      it('exists', function() {
        expect(res.get).to.have.been.calledWith('/');
      });

      describe('middleware', function() {
        var ctx;

        beforeEach(function() {
          ctx = {};
          var fn = co.wrap(res.get.args[0][1]);
          fn.call(ctx, function*() {});
        });

        it('sets result body to package info', function() {
          expect(ctx.body).to.exist;
          expect(JSON.parse(ctx.body)).to.deep.equal(mock_pkg);
        });
      });
    })


  })

});
