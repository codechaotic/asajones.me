module.exports = function(config) {
    config.set({
        basePath: '../../',
        // ... normal karma configuration
        browsers: ['PhantomJS'],
        files: [
            // all files ending in "_test"
            'test/*_spec.js',
            'test/**/*_spec.js'
            // each file acts as entry point for the webpack configuration
        ],
        frameworks: ['jasmine'],
        preprocessors: {
            // add webpack as preprocessor
            'test/*_spec.js': ['webpack'],
            'test/**/*_spec.js': ['webpack']
        },

        webpack: {
            // karma watches the test entry points
            // (you don't need to specify the entry option)
            // webpack watches dependencies

            // webpack configuration
        },

        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i. e.
            noInfo: true
        },

        plugins: [
            require("karma-webpack")
        ]

    });
};
