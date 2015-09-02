"use strict";

var co = require('co');
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
chai.use(sinonChai);

var static_middleware = require('./static_middleware')

describe('module static_middleware', function() {
  var spies;
  var mock_send;
  var mock_conf;
  var mock_hash;

  beforeEach(function() {
    spies = {
      send: sinon.stub(),
      ctx: {
        set: sinon.spy()
      }
    }

    mock_send = spies.send.returns(Promise.resolve('fake/public/file'));
    mock_conf = {
      pub_dir: 'fake/public'
    };
    mock_hash = {
      file: 'fakehash'
    };
  });

  describe('exports', function() {
    it('injects send, conf, and hash', function() {
      expect(static_middleware.$inject).to.deep.equal([ 'send', 'conf', 'hash' ])
    })

    it('is named static_middleware', function() {
      expect(static_middleware.name).to.equal('static_middleware')
    })
  });

  describe('middleware', function() {
    var ctx;
    var fn;

    beforeEach(function() {
      ctx = {
        method: 'GET',
        path: '/',
        set: spies.ctx.set,
        fresh: true
      };
      var mw = static_middleware(mock_send, mock_conf, mock_hash);
      fn = co.wrap(mw)
    });

    it('uses the public directory', function(done) {
      fn.call(ctx, (function*() {})())
        .then(function() {
          expect(spies.send).to.have.been.calledWith(
            sinon.match.object,
            sinon.match.string,
            sinon.match.has('root', mock_conf.pub_dir)
          )
        })
        .then(done)
    });

    it('uses index.html for default path', function(done) {
      fn.call(ctx, (function*() {})())
        .then(function() {
          expect(spies.send).to.have.been.calledWith(
            sinon.match.object,
            sinon.match.string,
            sinon.match.has('index', 'index.html')
          )
        })
        .then(done)
    });

    it('sets Etag header to file hash', function(done) {
      fn.call(ctx, (function*() {})())
        .then(function() {
          expect(spies.ctx.set).to.have.been.calledWith(
            'Etag',
            mock_hash['file']
          )
        })
        .then(done)
    });

    it('sets far-future expiration', function(done) {
      fn.call(ctx, (function*() {})())
        .then(function() {
          expect(spies.ctx.set).calledWith(
            'Cache-Control',
            'max-age=31536000000'
          )
        })
        .then(done)
    });

    it('sets single day expiration if file extension is .html', function(done) {
      spies.send.returns(Promise.resolve('fake/public/file.html'));
      fn.call(ctx, (function*() {})())
        .then(function() {
          expect(spies.ctx.set).to.have.been.calledWith(
            'Cache-Control',
            'max-age=86400000, must-revalidate'
          )
        })
        .then(done)
    });

    it('sets status 304 for fresh files', function(done) {
      fn.call(ctx, (function*() {})())
        .then(function() {
          expect(ctx.status).to.equal(304);
        })
        .then(done)
    });
  });
});
