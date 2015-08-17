var mongoose = require('mongoose');
var Q = require('q');
var connect = Q.nbind(mongoose.connect,mongoose);

module.exports = [
  'config',
  function(config) {
    mongoose.connection
      .on('connected', onConnected)
      .on('error', onError)
      .on('disconnected', onDisconnected);

    return connect(config.mongo_url);

    function onConnected() {
      console.log('Mongoose default connection open to ' + config.mongo_url);
    }

    function onError(err) {
      console.log('Mongoose default connection error: ' + err);
    }

    function onDisconnected() {
      console.log('Mongoose default connection disconnected');
    }
  }
];
