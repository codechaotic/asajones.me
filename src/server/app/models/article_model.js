module.exports = article_model;

article_model.$inject = [
  'database_service'
];

/**
* Schema and wrapper for articles
*
* @method article_model
* @param {Robe Instance} database_service
* @return {Object} Returns the model API
*/
function article_model(database_service) {
  var Article = database_service.collection('article', {
    rawMode: true,
    schema: {
      title: {
        type: String,
        required: true
      },
      body: {
        type: String,
        required: true
      },
      tags: {
        type: [{
          name: {
            type: String
          }
        }]
      },
      published: {
        type: Date,
        required: true
      },
      modified: {
        type: Date,
        required: true
      }
    }
  });

  return {
    create: function* create(raw) {
      if(!raw || typeof raw !== 'object') return;
      raw.published = raw.modified = new Date();
      return yield Article.insert(raw);
    },
    list: function* list() {
      var query = {};
      return yield Article.find(query);
    },
    delByID: function* delByID(id) {
      if(!id) return;
      var query = { _id: id };
      var opts = { justOne: true };
      return yield Article.remove(query, opts);
    },
    getByID: function* getByID(id) {
      if(!id) return;
      var query = { _id: id };
      return yield Article.findOne(query);
    },
    setByID: function* setByID(id, raw) {
      if(!id || !raw) return;
      raw.modified = new Date();
      delete raw.published;
      delete raw._id;
      var query = { _id: id };
      var update = { $set: raw };
      var opts = { multi: false };
      return yield Article.update(query, update, opts);
    }
  };
}
