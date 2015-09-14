module.exports = post_model;

post_model.$inject = [
  'database_service'
];

/**
* Schema and wrapper for posts
*
* @method post_model
* @param {Robe Instance} database_service
* @return {Object} Returns the model API
*/
function post_model(database_service) {
  var post = database_service.collection('post', {
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
      return yield post.insert(raw);
    },
    list: function* list() {
      var query = {};
      return yield post.find(query);
    },
    delByID: function* delByID(id) {
      if(!id) return;
      var query = { _id: id };
      var opts = { justOne: true };
      return yield post.remove(query, opts);
    },
    getByID: function* getByID(id) {
      if(!id) return;
      var query = { _id: id };
      return yield post.findOne(query);
    },
    setByID: function* setByID(id, raw) {
      if(!id || !raw) return;
      raw.modified = new Date();
      delete raw.published;
      delete raw._id;
      var query = { _id: id };
      var update = { $set: raw };
      var opts = { multi: false };
      return yield post.update(query, update, opts);
    }
  };
}
