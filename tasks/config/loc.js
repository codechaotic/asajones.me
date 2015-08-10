(function() {
  "use strict";

  var path    = require('path')

  var root  = exports.root     = process.cwd()
  var vend  = exports.vend_dir = path.join(root, 'bower_components')
  var dest  = exports.dest_dir = path.join(root, 'dist')
  var pub   = exports.pub_dir  = path.join(dest, 'public')
  var src   = exports.src_dir  = path.join(root, 'src')


  exports.src = {
    client: path.join(src, 'client'),
    server: path.join(src, 'server')
  }

  exports.dest = {
    style:  path.join(pub,'style'),
    script: path.join(pub,'script')
  }

})()
