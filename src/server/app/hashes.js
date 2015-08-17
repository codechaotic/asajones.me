var fs = require('fs');
var path = require('path');
var glob = require('glob');
var crypto = require('crypto');

module.exports = [
  'config',
  function(config) {
    var hashes = {};
    var pub_dir = path.join(process.cwd(),config.public_dir);

    glob.sync(pub_dir + '/**/*').forEach(function(file) {
      if(fs.statSync(file).isDirectory()) return;
      if(file.match(/\.gz$/g)) return;
      var filepath = path.relative(pub_dir,file);
      var contents = fs.readFileSync(file);
      hashes[filepath] = crypto.createHash('md5').update(contents).digest('hex');
    });
    return hashes;
  }
];
