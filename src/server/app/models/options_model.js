module.exports = [
  'db',
  function(db) {
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
];
