module.exports = staticfiles;

staticfiles.$inject = [ 'send', '_conf', '_hash' ];
function staticfiles(send, _conf, _hash) {
  return function() {
    return function*(next) {
      if(this.method == 'HEAD' || this.method == 'GET'){
        var filepath = yield send(this, this.path, {
          root: _conf.pub_dir,
          index: 'index.html'
        });
        if(filepath) {
          var file = filepath.substr(_conf.pub_dir.length+1).replace('.gz','');
          this.set('Etag',_hash[file]);
          if(filepath.match(/\.html$/)) {
            this.set('Cache-Control', 'max-age=86400000, must-revalidate');
          }
          else this.set('Cache-Control', 'max-age=31536000000');
          if (this.fresh) this.status = 304;
        }
      }
      yield* next;
    };
  };
}
