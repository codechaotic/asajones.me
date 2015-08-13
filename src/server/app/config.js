(function() {

  //@autoexport
  exports.config = {
    mongo_url:          process.env.MONGO_URL || 'mongodb://localhost/test',
    port:               process.env.PORT || 8080,
    public_dir:         '/public',
    hashes:             require('../hash.json')
  }

  //@autoexport
  exports.body = require('koa-body')

  //@autoexport
  exports.router = require('koa-router')

})();
