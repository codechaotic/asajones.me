var send = require('koa-send');
var path = require('path');

module.exports = [
  'config',
  'hashes',
  function(config,hashes) {
    return function() {
      var pub_dir = path.join(process.cwd(),config.public_dir);
      return function*(next) {
        if(this.method == 'HEAD' || this.method == 'GET'){
          var filepath = yield send(this, this.path, {
            root: pub_dir,
            index: 'index.html'
          });
          if(filepath) {
            var file = filepath.substr(pub_dir.length+1).replace('.gz','');
            this.set('Etag',hashes[file]);
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
];
