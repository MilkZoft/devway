'use strict';

module.exports = function(config) {
  config.set({
    basePath: '',

    // Frameworks
    frameworks: ['mocha', 'chai', 'sinon'],

    // Files to load in the browser
    files: [
      // Dependencies
      'src/public/bower_components/lodash/dist/lodash.min.js',
      'src/public/bower_components/domready/ready.min.js',
      'src/public/bower_components/angular/angular.js',
      'src/public/bower_components/angular-mocks/angular-mocks.js',
      'src/public/bower_components/restangular/dist/restangular.min.js',

      'test/clientTestHelper.js',
      'src/public/js/utils.js',

      // fixtures
      //'test/fixtures/public/js/**/*.html',
      'test/fixtures/public/js/**/*.json',

      // Tests files
      'test/public/js/**/*Test.js'
    ],

    // List of files to exclude
    exclude: [],

    preprocessors: {
      'test/fixtures/public/js/**/*.html': ['html2js'],
      'test/fixtures/public/js/**/*.json': ['html2js']
    },

    // Test results reporter to use (possible values: 'dots', 'progress')
    reporters: ['mocha'],

    // Web Server Port
    port: 9876,

    // Enable / disable colors in the output (reporters and logs)
    colors: true,

    // Level of logging (config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG)
    logLevel: config.LOG_INFO,

    // Enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start this browser
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    singleRun: true,

    // Capture console.log
    client: {
      captureConsole: true
    }
  });
};
