var test_port = process.env.PORT || 8080

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'http://localhost:' + test_port,
  specs: ['test/spec.js'],
  capabilities: {
    'browserName': 'phantomjs',
    'phantomjs.binary.path': require('phantomjs').path,
  }
}

console.log(JSON.stringify(exports.config,null,'  '))
