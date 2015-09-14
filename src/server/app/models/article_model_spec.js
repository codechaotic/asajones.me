/**
* Module exports an object which exposes methods for operating on
* the articles in the database. Encapsulates the model schema, validation,
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
var article_model = require('./article_model');
var database_service = require('../services/database_service');

var test_config = {
  mongo_url: 'mongodb://localhost:27017/test'
}

describe('MODEL Article', function() {
  describe('module', function() {
    it('injects database_service', function() {
      expect(article_model.$inject).to.deep.equal([
        'database_service'
      ]);
    });

    it('is named article_model', function() {
      expect(article_model.name).to.equal('article_model');
    });
  })

  describe('result', function() {
    var article;
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
        yield article.remove({})
      })
    }

    before(function(done) {
      database_service(robe, test_config)
        .then(function(db) {
          article = db.collection('article', {rawMode: true});
          model = article_model(db);
        })
        .then(_empty)
        .then(done, done)
    })

    after(function(done) {
      article.db.close()
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
