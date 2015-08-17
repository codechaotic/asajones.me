var fs = require('fs');
var glob = require('glob');
var path = require('path');

var src = process.cwd() + '/src/server'
var dest = process.cwd() + '/dist'
var pkg = require(process.cwd()+'/package.json')
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
    root: src
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'jshint?esnext',
        exclude: /node_modules/
      }
    ]
  },
  node: {
    __filename: false,
    __dirname: false
  },
  externals: nodeModules,
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"init", /* filename= */"init.js"),
    new webpack.BannerPlugin('require("source-map-support").install();',
                             { raw: true, entryOnly: false })
  ],
  devtool: '#eval-source-map'
}
