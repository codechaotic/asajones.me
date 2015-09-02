"use strict";

var co = require('co');
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
chai.use(sinonChai);

var static_middleware = require('./static_middleware')

describe('module static_middleware', function() {
  var arg
  var ctx

  function run(args, ctx) {
    var next = function*() {}
    var mw = static_middleware.call(null, args.send, args.conf, args.hash)
    var fn = co.wrap(mw)
    return fn.call(ctx, next())
  }

  beforeEach(function() {
    // default setup
    arg = {
      send: sinon.stub().returns(Promise.resolve('fake/public/file')),
      conf: {
        pub_dir: 'fake/public'
      },
      hash: {
        file: 'fakehash'
      }
    };
    ctx = {
      method: 'GET',
      path: '/',
      set: sinon.spy(),
      fresh: true
    };
  });

  describe('compatibility', function() {
    it('injects send, conf, and hash', function(done) {
      expect(static_middleware.$inject).to.deep.equal([ 'send', 'conf', 'hash' ])
      done();
    })

    it('is named static_middleware', function(done) {
      expect(static_middleware.name).to.equal('static_middleware')
      done();
    })
  });

  describe('configuration', function() {
    it('uses the public directory', function(done) {
      run(arg,ctx)
        .then(function() {
          expect(arg.send).to.have.been.calledWith(
            sinon.match.object,
            sinon.match.string,
            sinon.match.has('root', arg.conf.pub_dir)
          )
        })
        .then(done)
    });

    it('uses index.html for default path', function(done) {
      run(arg,ctx)
        .then(function() {
          expect(arg.send).to.have.been.calledWith(
            sinon.match.object,
            sinon.match.string,
            sinon.match.has('index', 'index.html')
          )
        })
        .then(done)
    });
  });

  describe('actions', function() {
    it('sets Etag header to file hash', function(done) {
      run(arg,ctx)
        .then(function() {
          expect(ctx.set).to.have.been.calledWith(
            'Etag',
            arg.hash['file']
          )
        })
        .then(done)
    });

    it('sets far-future expiration', function(done) {
      run(arg,ctx)
        .then(function() {
          expect(ctx.set).calledWith(
            'Cache-Control',
            'max-age=31536000000'
          )
        })
        .then(done)
    });

    it('sets single day expiration if file extension is .html', function(done) {
      arg.send.returns(Promise.resolve('fake/public/file.html'));
      run(arg,ctx)
        .then(function() {
          expect(ctx.set).to.have.been.calledWith(
            'Cache-Control',
            'max-age=86400000, must-revalidate'
          )
        })
        .then(done)
    });

    it('sets status 304 for fresh files', function(done) {
      run(arg,ctx)
        .then(function() {
          expect(ctx.status).to.equal(304);
        })
        .then(done)
    });
  });
});
