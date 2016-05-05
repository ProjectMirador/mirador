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
      'js/lib/jquery.min.js',
      'js/lib/jquery-ui.min.js',
      'js/lib/jquery.scrollTo.min.js',
      'js/lib/jquery.qtip.min.js',
      'js/lib/state-machine.min.js',
      'js/lib/tinymce.min.js',
      'js/lib/handlebars.js',
      'js/lib/openseadragon.min.js',
      'js/lib/d3.v3.min.js',
      'js/lib/pubsub.min.js',
      'js/lib/URI.min.js',
      'js/lib/mousetrap.min.js',
      'js/lib/isfahan.js',
      'js/lib/paper-full.min.js',
      'js/lib/spectrum.js',
      'js/lib/jquery.awesome-cursor.js',
      'js/lib/i18next.min.js',
      'bower_components/sinon-server/index.js',
      'bower_components/jasmine-jquery/lib/jasmine-jquery.js',
      // app
      'js/src/*.js',
      'js/src/viewer/*.js',
      'js/src/manifests/*.js',
      'js/src/annotations/*.js',
      'js/src/workspaces/*.js',
      'js/src/widgets/*.js',
      'js/src/utils/*.js',
      // spec
      'spec/**/*.js',
      {pattern: 'spec/data/*', watched: true, served: true, included: false},
      {pattern: 'spec/fixtures/*json', watched: true, served: true, included: false},
    ],


    // list of files to exclude
    exclude: [
      'spec/mirador.test.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],


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
