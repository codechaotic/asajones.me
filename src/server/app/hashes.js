module.exports = hash;

hash.$inject = ['fs', 'glob', 'crypto', '_conf'];
function hash(fs, glob, crypto, _conf) {
  var hashmap = {};

  glob.sync(_conf.pub_dir + '/**/*').forEach(function(filepath) {
    if(fs.statSync(filepath).isDirectory()) return;
    if(filepath.match(/\.gz$/g)) return;
    var file = filepath.substr(_conf.pub_dir.length+1);
    var contents = fs.readFileSync(filepath);
    hashmap[file] = crypto.createHash('md5').update(contents).digest('hex');
  });
  return hashmap;
}
