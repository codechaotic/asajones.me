(function() {

  var mongoose = require('mongoose')
  //@autoinject
  exports.comment_model = function(db) {
    var comment_schema = new mongoose.Schema({
          content: String,
          updated: { type: Date, default: Date.now }
        }),
        comment = mongoose.model('Comments', comment_schema)

    return {
      list: function() {
        return comment.find().exec()
      },
      create: function(comment) {
        return comment.create(comment)
      }
    }
  }

})();
