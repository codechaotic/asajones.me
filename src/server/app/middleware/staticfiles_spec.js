"use strict";
var staticfiles = require('./staticfiles')

describe('middleware staticfiles', function() {
  var next = function*() {}
  var run = function(file) {
    file = file || '/file';
    this.sendSpy.and.returnValue(this.args[1].pub_dir+file);
    var g = staticfiles.apply(null,this.args)().call(this.context, next())
    for( let i = g.next(); !i.done; i = g.next(i.value)) { /* Do Nothing */ }
  }

  beforeEach(function() {
    this.args = [
      require('koa-send'),
      { pub_dir: 'fake/public' },
      { file: 'fakehash' }
    ];
    this.context = {
      method: 'GET',
      path: '/',
      set: jasmine.createSpy('set'),
      fresh: true
    };
    this.sendSpy = spyOn(this.args, '0');
  });

  it('retrieves files in the public directory', function(done) {
    run.call(this)
    expect(this.args[0]).toHaveBeenCalledWith(
      jasmine.any(Object),
      jasmine.any(String),
      jasmine.objectContaining({
        root: this.args[1].pub_dir
      })
    )
    done()
  });

  it('retrieves \'index.html\' for default path \'/\'', function(done) {
    run.call(this)
    expect(this.args[0]).toHaveBeenCalledWith(
      jasmine.any(Object),
      jasmine.any(String),
      jasmine.objectContaining({
        index: 'index.html'
      })
    )
    done()
  });

  it('sets the Etag to the file content hash', function(done) {
    run.call(this)
    expect(this.context.set).toHaveBeenCalledWith(
      'Etag',
      this.args[2]['file']
    )
    done()
  });

  it('sets 1 day expiration for html file', function(done) {
    run.call(this, '/file.html')
    expect(this.context.set).toHaveBeenCalledWith(
      'Cache-Control',
      'max-age=86400000, must-revalidate'
    )
    done()
  });

  it('sets far-future expiration for non-html file', function(done) {
    run.call(this)
    expect(this.context.set).toHaveBeenCalledWith(
      'Cache-Control',
      'max-age=31536000000'
    )
    done()
  });

  it('sets status code 304 for fresh files', function(done) {
    run.call(this)
    expect(this.context.status).toEqual(304);
    done()
  });

  it('does not set status code for stale files', function(done) {
    this.context.fresh = false;
    run.call(this)
    expect(this.context.status).not.toEqual(304);
    done()
  });
});
