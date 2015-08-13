(function() {
  'use strict';

  var webpack = require('webpack')
  var ExtractTextPlugin = require("extract-text-webpack-plugin")
  var CompressionPlugin = require("compression-webpack-plugin")
  var HtmlWebpackPlugin = require('html-webpack-plugin')

  var cssnano = require('cssnano')

  var fs = require('fs')

  var ROOT = __dirname

  module.exports = function(version) {
    if(version && typeof version == 'string') {
      version = '?' + version.replace(/\./g,'-')
    } else version = ''
    return {
      context: ROOT,
      entry: {
        app: 'bundle.js',
        vendor: 'vendor.js'
      },
      output: {
        path: ROOT,
        filename: '[name].js'+version
      },
      resolve: {
        root: ROOT
      },
      module: {
        loaders: [
          {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract("style", "css!postcss!csslint?configFile="+ROOT+"/.csslintrc!less")
          },
          {
            test: /\.js$/,
            loader: 'uglify!ng-annotate!jshint',
            exclude: /node_modules|bower_components/
          },
          {
            test: /\.js$/,
            loader: 'uglify',
            include: /node_modules|bower_components/
          },
          {
            test: /\.(woff|woff2|ttf|eot|svg)(\?]?.*)?$/,
            loader : 'file-loader?name=fonts/[name].[ext]'+version
          },
          {
            test: /\.html/,
            loader: 'raw'
          }
        ]
      },
      postcss: function () {
        return [
          cssnano({
            comments: {removeAll:true},
            autoprefixer: {
              remove: false,
              browsers: [
                'last 5 version',
                '> 1%',
                'opera 12.1',
                'bb 10',
                'android 4'
              ]
            }
          })
        ]
      },
      plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin('[name].css'+version),
        new CompressionPlugin({
            asset: "{path}.gz?{query}",
            algorithm: "gzip",
            threshold: 10240,
            minRatio: 0.8
        }),
        new HtmlWebpackPlugin({
          templateContent: function(templateParams, compilation, callback) {
            fs.readFile(__dirname + '/template.html',function(err,template) {
              if(err) callback(err)
              callback(null, template.toString());
            })
          },
          inject: true // Inject all scripts into the body
        })
      ]
    }
  }

})();
