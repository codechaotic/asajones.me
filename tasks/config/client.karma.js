module.exports = function(config) {
    config.set({
        basePath: '../../',
        browsers: ['PhantomJS'],
        files: [
          require.resolve('angular/angular'),
          require.resolve('angular-route/angular-route'),
          require.resolve('angular-mocks/angular-mocks'),
          'src/client/**/*_spec.js'
        ],
        frameworks: ['mocha','chai'],
        reporters: ['mocha'],
        preprocessors: {
          'src/client/**/*_spec.js': ['webpack']
        },
        webpack: {
          module: {
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
        }

    });
};
