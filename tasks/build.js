var buildClient = require('./build/client');
var buildServer = require('./build/server');

module.exports = function() {
  return buildClient()
    .then(buildServer)
}
