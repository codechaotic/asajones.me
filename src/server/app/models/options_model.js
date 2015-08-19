module.exports = options_model;

options_model.$inject = ['db'];
function options_model(db) {
  var OptionsCollection = db.collection('options', {
    schema: {
      key: {
        type: String,
        required: true
      },
      value: {
        type: String,
        required: true
      }
    }
  });

  return {
    list: function*() {
      return yield OptionsCollection.find();
    }
  };
}
