"use strict";

var co = require('co');
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;

chai.use(chaiAsPromised);
chai.use(sinonChai);

var database_service = require('./database_service')

describe('module database_service', function() {
  var spies;
  var mock_robe;
  var mock_conf;

  beforeEach(function() {
    spies = {
      robe: {
        connect: sinon.stub()
      }
    };

    mock_robe = {
      connect: spies.robe.connect.returns(Promise.resolve('robeconnection'))
    };

    mock_conf = {
      mongo_url: 'fakemongourl'
    };
  });

  describe('exports', function() {
    it('injects robe, and conf', function() {
      expect(database_service.$inject).to.deep.equal([ 'robe', 'conf' ])
    })

    it('is named database_service', function() {
      expect(database_service.name).to.equal('database_service')
    })
  });

});
