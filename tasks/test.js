var testClient = require('./test/client');
var testServer = require('./test/server');

module.exports = function() {
  return testClient()
    .then(testServer)
}
