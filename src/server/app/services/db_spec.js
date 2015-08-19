"use strict";

var co = require('co');
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
chai.use(sinonChai);

var db = require('./db')

describe('module db', function() {
  var ijc

  beforeEach(function() {
    // default setup
    ijc = {
      robe: {
        connect: sinon.stub().returns('robeconnection'),
      },
      conf: {
        mongo_url: 'fakemongourl'
      }
    };
  });

  describe('compatibility', function() {
    it('injects robe, and conf', function() {
      expect(db.$inject).to.deep.equal([ 'robe', 'conf' ])
    })

    it('is named db', function() {
      expect(db.name).to.equal('db')
    })
  });

  describe('result', function() {
    var res
    beforeEach(function() {
      res = db.call(null,ijc.robe,ijc.conf);
    })
    it('uses the mongo url', function() {
      expect(ijc.robe.connect).to.have.been.calledWith(ijc.conf.mongo_url);
    });
    it('is a robe connection', function() {
      expect(res).to.equal('robeconnection')
    });
  });
});
