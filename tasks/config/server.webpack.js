var fs = require('fs');
var glob = require('glob');
var path = require('path');

var src = process.cwd() + '/src/server'
var dest = process.cwd() + '/dist'
var webpack = require('webpack')

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  context: src,
  entry: {
    init: 'init.js'
  },
  target: 'node',
  output: {
    path: dest,
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  resolve: {
    root: src,
    alias: {
      'package.json': process.cwd()+'/package.json'
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'jshint?esnext',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  node: {
    __filename: false,
    __dirname: false
  },
  externals: nodeModules,
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"init", /* filename= */"init.js")
  ]
}
