(function() {
  "use strict";

  var gulp              = require('gulp')
  var Q                 = require('q')

  var npm               = require('npm')
  var tar               = require('tar')
  var fs                = require('fs')
  var util              = require('util')
  var path              = require('path')
  var fstream           = require('fstream')
  var loc               = require('./config/loc')

  var log               = require('./custom/log')

  module.exports = function() {
    var npm_opts = {
      quiet: true,
      production: true,
      prefix: loc.dest_dir
    }
    var config = require('../package.json')
    config.scripts.start = 'node init.js'
    delete(config.devDependencies)
    return Q.nfcall(npm.load,npm_opts)
      .then(function() {
        return Q.nfcall(
          fs.writeFile,
          loc.dest_dir+'/package.json',
          JSON.stringify(config,null,'  ')
        )
      })
      .then(function() {
        return Q.nfcall(fs.readFile,'./README.md')
          .then( function(data) {
            Q.nfcall(fs.writeFile,loc.dest_dir+'/README.md',data)
          })
      })
      .then(function() { return Q.nfcall(npm.commands.install) })
      .then(function() {
        return Q.Promise(function(resolve,reject,notify) {
          var filename = util.format("%s-%s.tar", config.name, config.version)
          var dirDest = fs.createWriteStream(path.join(loc.root, filename))
          var packer = tar.Pack({ fromBase: true })
            .on('error', reject)
            .on('end', onEnd)
          fstream.Reader({ path: loc.dest_dir, type: "Directory" })
            .on('error', reject)
            .pipe(packer)
            .pipe(dirDest)
          function onEnd() { log.info('Created '+filename); resolve() }
        })
      })
      .catch(function(err) {
        log.fatal(err)
      })
  }

})()
