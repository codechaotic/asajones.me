var Zeninjector = require('zeninjector');
var koa = require('koa');
var mock = require('mock-fs');
var http = require('http');

describe('middleware staticfiles', function() {
  var zen;
  var app;
  var server;
  var options;
  var NOW = 1000 /*1 second old*/

  beforeEach(function() {
    zen = new Zeninjector();
    zen.registerAndExport('config', {
      public_dir: 'fakeapp/public'
    });
    zen.registerAndExport('hashes', {
      'index.html': 'indexhash',
      file1: 'file1hash'
    });
    zen.register('staticfiles',require('./staticfiles'));
    zen.register('app', ['staticfiles', function(staticfiles) {
      app = koa();
      app.use(staticfiles());
      server = http.createServer(app.callback()).listen(3000);
    }]);
    mock({
      'fakeapp/public': {
        'index.html': 'INDEX',
        file1: mock.file({
          content: 'FILE1',
          ctime: new Date(NOW),
          mtime: new Date(NOW)
        })
      }
    });
    options = {
       hostname: 'localhost',
       port: 3000,
       path: '/',
       headers: {
         'Cache-Control': 'max-age=0'
       }
     };
  });

  afterEach(function(done) {
    mock.restore();
    server.close(done);
  });

  it('retrieves files in the public directory', function(done) {
    zen.resolve('app')
      .then(function() {
        options.path = '/file1'
        http.get(options,function(res) {
          expect(res.statusCode).toEqual(200)
          res.on('data', function (chunk) {
            expect(chunk.toString()).toEqual('FILE1')
          })
          .on('end',done)
        })
      })
  });

  it('retrieves \'index.html\' for default path \'/\'',function(done) {
    zen.resolve('app')
      .then(function() {
        http.get(options,function(res) {
          expect(res.statusCode).toEqual(200)
          res.on('data', function (chunk) {
            expect(chunk.toString()).toEqual('INDEX')
          })
          .on('end',done)
        })
      })
  });

  it('ignores requests for nonexistent file', function(done) {
    zen.resolve('app')
      .then(function() {
        options.path = '/notafile'
        http.get(options,function(res) {
          expect(res.statusCode).toEqual(404)
          done()
        })
      })
  });

  it('sets the Etag to the file content hash', function(done) {
    zen.resolve('app')
      .then(function() {
        options.path = '/file1'
        http.get(options,function(res) {
          expect(res.headers.etag).toEqual('file1hash')
          done()
        })
      })
  });

  it('sets 1 day expiration for html file', function(done) {
    zen.resolve('app')
      .then(function() {
        http.get(options,function(res) {
          var cc = res.headers['cache-control'].split(',').map(function(p){
            return p.trim()
          });
          expect(cc).toContain('max-age=86400000'/*One Day*/)
          done()
        })
      })
  });

  it('sets far-future expiration for non-html file', function(done) {
    zen.resolve('app')
      .then(function() {
        options.path = '/file1'
        http.get(options,function(res) {
          var cc = res.headers['cache-control'].split(',').map(function(p){
            return p.trim()
          });
          expect(cc).toContain('max-age=31536000000'/*One Year*/)
          done()
        })
      })
  });

  it('sets the Last-Modified header to the file\'s mtime', function(done) {
    zen.resolve('app')
      .then(function() {
        options.path = '/file1'
        http.get(options,function(res) {
          var lm = new Date(res.headers['last-modified']).getTime()
          expect(lm).toEqual(new Date(NOW).getTime())
          done()
        })
      })
  });

  it('sets status code 304 for unchanged files', function(done) {
    zen.resolve('app')
      .then(function() {
        options.path = '/file1'
        options.headers['If-Modified-Since'] = new Date(NOW).toUTCString()
        options.headers['If-None-Match'] = 'file1hash'
        http.get(options,function(res) {
          expect(res.statusCode).toEqual(304)
          done()
        })
      })
  });

  it('gives a fresh request for for a changed etag', function(done) {
    zen.resolve('app')
      .then(function() {
        options.path = '/file1'
        options.headers['If-Modified-Since'] = new Date(NOW).toUTCString()
        options.headers['If-None-Match'] = 'oldfile1hash'
        http.get(options,function(res) {
          expect(res.statusCode).toEqual(200)
          done()
        })
      })
  });

  it('gives a fresh request for for a modified file', function(done) {
    zen.resolve('app')
      .then(function() {
        options.path = '/file1'
        options.headers['If-Modified-Since'] = new Date(NOW-1000).toUTCString()
        options.headers['If-None-Match'] = 'file1hash'
        http.get(options,function(res) {
          expect(res.statusCode).toEqual(200)
          done()
        })
      })
  });
});
