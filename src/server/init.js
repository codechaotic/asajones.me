(function() {
  process.chdir(__dirname)
  require('harmonize')()

  var Zeninjector       = require('zeninjector'),
      zen               = new Zeninjector()

  zen.scan('app/**/*.js')
    .then(function() {
      zen.resolve('app')
    })

})()
