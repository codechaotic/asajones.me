var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var CompressionPlugin = require("compression-webpack-plugin")
var HtmlWebpackPlugin = require('html-webpack-plugin')

var cssnano = require('cssnano')

var fs = require('fs')

var src = process.cwd() + '/src/client'
var dest = process.cwd() + '/dist/public'
var pkg = require(process.cwd()+'/package.json')
var bust = (pkg.version?'?'+pkg.version.replace(/\./g,'-'):'')

module.exports = {
  context: src,
  entry: {
    app: 'app.js',
    vendor: 'vendor.js'
  },
  output: {
    path: dest,
    filename: '[name].js'+bust
  },
  resolve: {
    root: src
  },
  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style", [
          'css',
          'postcss',
          'csslint?configFile='+__dirname+'/.csslintrc',
          'less'
        ].join('!'))
      },
      {
        test: /\.js$/,
        loaders: [
          'uglify?compress',
          'ng-annotate',
          'jshint?esnext'
        ],
        exclude: /node_modules|bower_components/
      },
      {
        test: /\.js$/,
        loader: 'uglify?compress',
        include: /node_modules|bower_components/
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?]?.*)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'+bust
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
        discardComments: {removeAll:true},
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
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin('[name].css'+bust),
    new CompressionPlugin({
        asset: '{path}.gz?{query}',
        algorithm: 'gzip',
        threshold: 10240,
        minRatio: 0.8
    }),
    new HtmlWebpackPlugin({
      templateContent: fs.readFileSync(src + '/template.html').toString(),
      inject: true // Inject all scripts into the body
    })
  ]
}
