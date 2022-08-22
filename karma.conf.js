let browsers = ['ChromeHeadless'];

module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
            // Load the distributed browser bundle first
            {pattern: 'dist/isomorphic-argon2.browser.js', watched: false},
            // !!! use watched: false as we use webpacks watch
            {pattern: '__tests__/browser.spec.js', watched: false}
        ],
        client: {
        },
        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
        ],
        reporters: ['progress'],
        port: 9876,
        colors: true,
        // config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers,
    })
}
