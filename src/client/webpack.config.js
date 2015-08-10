(function() {
  'use strict';

  var webpack = require('webpack')
  var ExtractTextPlugin = require("extract-text-webpack-plugin")
  var CompressionPlugin = require("compression-webpack-plugin")
  var HtmlWebpackPlugin = require('html-webpack-plugin')

  var APP = __dirname + '/app'
  module.exports = {
    context: APP,
    entry: {
      app: './core/entry.js'
    },
    output: {
      path: APP,
      filename: '[name].js',
      chunkFilename: "[id].js"
    },
    resolve: {
      root: APP
    },
    module: {
      loaders: [
        {
          test: /\.less$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
        },
        {
          test: /\.js$/,
          loader: 'ng-annotate!babel!jshint',
          exclude: /node_modules|bower_components/
        }
      ]
    },
    plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new ExtractTextPlugin("[name].css"),
      new CompressionPlugin({
          asset: "{file}.gz",
          algorithm: "gzip",
          regExp: /\.js$|\.html$/,
          threshold: 10240,
          minRatio: 0.8
      }),
      new HtmlWebpackPlugin({
        templateContent: require('fs').readFileSync(__dirname + '/template.html').toString(),
        inject: true // Inject all scripts into the body
      })
    ]
  }

})();
