var nodemon = require('nodemon');
var path = require('path');

module.exports = function() {
  nodemon({
    execMap: {
      js: 'nod'
    },
    script: path.join(process.cwd(),'dist/init'),
    ignore: ['*'],
    watch: ['foo/'],
    ext: 'noop'
  }).on('restart', function() {
    console.log('Restarted!');
  });
};
