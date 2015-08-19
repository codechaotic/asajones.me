var webpack = require('webpack');
module.exports = function(config) {
    config.set({
        basePath: '../../',
        browsers: ['PhantomJS'],
        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-route/angular-route.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'src/client/**/*_spec.js'
        ],
        frameworks: ['jasmine'],
        preprocessors: {
            'src/client/**/*_spec.js': ['webpack']
        },
        webpack: {
          module: {
            devtool: 'eval',
            output: {
              path: __dirname + '/temp',
              filename: '[name].js'
            },
            resolve: {
              extensions: ["", ".js"]
            },
            loaders: [
              {
                test: /\.js$/,
                loaders: [
                  'ng-annotate',
                  'jshint?esnext'
                ],
                exclude: /node_modules|bower_components/
              },
              {
                test: /\.html/,
                loader: 'raw'
              }
            ]
          }
        },
        webpackMiddleware: {
          noInfo: true
        },
        plugins: [
          require('karma-jasmine'),
          require('karma-webpack'),
          require('karma-phantomjs-launcher')
        ]

    });
};
