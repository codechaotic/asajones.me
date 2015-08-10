(function() {

  var mongoose          = require('mongoose'),
      Q                 = require('q'),
      connect           = Q.nbind(mongoose.connect,mongoose)

  //@autoinject
  exports.db = function(config) {
    mongoose.connection
      .on('connected', onConnected)
      .on('error', onError)
      .on('disconnected', onDisconnected)

    return connect(config.mongo_url)

    function onConnected() {
      console.log('Mongoose default connection open to ' + config.mongo_url)
    }

    function onError(err) {
      console.log('Mongoose default connection error: ' + err)
    }

    function onDisconnected() {
      console.log('Mongoose default connection disconnected')
    }
  }

})();
