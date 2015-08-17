var Robe = require('robe');

module.exports = [
  'config',
  function(config) {
    return Robe.connect(config.mongo_url);
  }
];
