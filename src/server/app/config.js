var path = require('path');
var app_dir = path.relative(process.cwd(),__dirname);
module.exports = function() {
  return {
    mongo_url:          process.env.MONGO_URL || 'mongodb://localhost/test',
    port:               process.env.PORT || 8080,
    public_dir:         path.join(app_dir,'public')
  };
};
