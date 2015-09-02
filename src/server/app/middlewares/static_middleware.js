module.exports = static_middleware;

static_middleware.$inject = [
  'send',
  'conf',
  'hash'
];

function static_middleware(send, conf, hash) {
  return function*(next) {
    if(this.method == 'HEAD' || this.method == 'GET'){
      var filepath = yield send(this, this.path, {
        root: conf.pub_dir,
        index: 'index.html'
      });
      if(filepath) {
        var file = filepath.substr(conf.pub_dir.length+1).replace('.gz','');
        this.set('Etag',hash[file]);
        if(filepath.match(/\.html$/)) {
          this.set('Cache-Control', 'max-age=86400000, must-revalidate');
        }
        else this.set('Cache-Control', 'max-age=31536000000');
        if (this.fresh) this.status = 304;
      }
    }
    yield* next;
  };
}
