'use strict';

require.config({
  paths: {
    // General dependencies
    'domReady': '/bower_components/requirejs-domready/domReady',
    'angular':  '/bower_components/angular/angular.min',
    'lodash':   '/bower_components/lodash/dist/lodash.min',
    'jquery':   '/bower_components/jquery/dist/jquery.min',

    // Local dependencies
    'device': '/js/device',
    'utils':  '/js/utils',

    'codejobsApp': 'codejobs/codejobs.module'
  },
  shim: {
    'angular': {
      exports: 'angular'
    },
    'lodash': {
      exports: '_'
    },
    'jquery': {
      exports: '$'
    },
    'utils': {
      exports: 'utils'
    },
    'domReady': {
      exports: 'domReady'
    }
  }
});
