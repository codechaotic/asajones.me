var koa = require('koa');
var mock = require('mock-fs');

var staticfiles = require('./staticfiles')

describe('middleware staticfiles', function() {
  var app;

  beforeEach(function() {
    app = koa();
    mock({
      'fakeapp/public': mock.directory({
        mode: 755,
        items: {
          'index.html': mock.file({
            content: 'INDEX',
            ctime: Date(0),
            mtime: Date(0),
            mode: 644,
          }),
          file: mock.file({
            content: 'File',
            ctime: Date(0),
            mtime: Date(0),
            mode: 644,
          })
        }
      })
    });
  })

  afterEach(function() {
    mock.restore();
  })

  it('retrieves files in the public directory', function() {

  })

  it('retrieves \'index.html\' for default path \'/\'',function() {

  })

  it('ignores requests for nonexistent file', function() {

  })

  it('sets the Etag to the file content hash', function() {

  })

  it('sets 1 day expiration for html file', function() {

  })

  it('sets far-future expiration for non-html file', function() {

  })

  it('sets the Last-Modified header to the file\'s mtime', function() {

  })

  it('sets status code 304 for modified files', function() {

  })
})
