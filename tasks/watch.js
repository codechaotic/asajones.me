var watchClient = require('./watch/client');
var watchServer = require('./watch/server');

module.exports = function() {
  return watchClient()
    .then(watchServer)
}
