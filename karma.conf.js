// Karma configuration
// Generated on Tue May 03 2016 11:44:23 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      // vendors
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/jquery-ui-dist/jquery-ui.min.js',
      'node_modules/jquery.scrollto/jquery.scrollTo.min.js',
      'node_modules/jstree/dist/jstree.min.js',
      'node_modules/qtip2/dist/jquery.qtip.min.js',
      'node_modules/javascript-state-machine/state-machine.min.js',
      'node_modules/tinymce/tinymce.min.js',
      'node_modules/handlebars/dist/handlebars.js',
      'node_modules/openseadragon/build/openseadragon/openseadragon.js',
      'node_modules/d3/d3.min.js',
      'node_modules/jquery-plugin/dist/ba-tiny-pubsub.js',
      'node_modules/urijs/src/URI.min.js',
      'node_modules/mousetrap/mousetrap.min.js',
      'js/lib/isfahan.js',
      'node_modules/paper/dist/paper-core.min.js',
      'node_modules/spectrum-colorpicker/spectrum.js',
      'node_modules/i18next/i18next.min.js',
      'node_modules/i18next-browser-languagedetector/i18nextBrowserLanguageDetector.min.js',
      'node_modules/i18next-xhr-backend/i18nextXHRBackend.min.js',
      'js/lib/modernizr.custom.js',
      'node_modules/sanitize-html/dist/sanitize-html.min.js',
      'node_modules/sinon/pkg/sinon.js',
      'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
      'node_modules/iiif-evented-canvas/dist/iiif-evented-canvas.umd.min.js',
      // app
      'js/src/mirador.js',
      'js/src/utils/handlebars.js',
      'js/src/*.js',
      'js/src/viewer/*.js',
      'js/src/manifests/*.js',
      'js/src/annotations/*.js',
      'js/src/workspaces/*.js',
      'js/src/widgets/*.js',
      'js/src/utils/*.js',
      // spec
      'spec/**/*.stub.js',
      {pattern: 'spec/data/*', watched: true, served: true, included: false},
      {pattern: 'spec/fixtures/*json', watched: true, served: true, included: false}
    ].concat(!process.env.KARMA_SPECS ? ['spec/**/*.js'] : process.env.KARMA_SPECS.split(',')),


    // list of files to exclude
    // exclude: [
    // This file holds the integration tests for Mirador
    //   'spec/mirador.test.js'
    // ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'js/src/**/*.js': ['coverage']
    },

    proxies: {
      '/spec': 'http://localhost:9876/base/spec'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage', 'coveralls'],

    coverageReporter: {
      type: 'lcov', // lcov or lcovonly are required for generating lcov.info files
      dir: 'coverage/'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
