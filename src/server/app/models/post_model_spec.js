/**
* Module exports an object which exposes methods for operating on
* the posts in the database. Encapsulates the model schema, validation,
* defaults, and query definitions.
*/

var co = require('co');
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;

chai.use(chaiAsPromised);
chai.use(sinonChai);

var robe = require('robe');
var post_model = require('./post_model');
var database_service = require('../services/database_service');

var test_config = {
  mongo_url: 'mongodb://localhost:27017/test'
}

describe('MODEL post', function() {
  describe('module', function() {
    it('injects database_service', function() {
      expect(post_model.$inject).to.deep.equal([
        'database_service'
      ]);
    });

    it('is named post_model', function() {
      expect(post_model.name).to.equal('post_model');
    });
  })

  describe('result', function() {
    var post;
    var model;
    var methods = [
      'create',
      'list',
      'delByID',
      'getByID',
      'setByID'
    ]

    var _empty = function() {
      return co(function* () {
        yield post.remove({})
      })
    }

    before(function(done) {
      database_service(robe, test_config)
        .then(function(db) {
          post = db.collection('post', {rawMode: true});
          model = post_model(db);
        })
        .then(_empty)
        .then(done, done)
    })

    after(function(done) {
      post.db.close()
        .then(done, done);
    })

    afterEach(function(done) {
      _empty()
        .then(done, done)
    })

    methods.forEach(function(method) {
      it('exposes method ' + method, function() {
        expect(model).to.respondTo(method);
      })
    })

  })
})
