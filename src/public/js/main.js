'use strict';

require.config({
  paths: {
    // General dependencies
    'domReady':    '/bower_components/requirejs-domready/domReady',
    'angular':     '/bower_components/angular/angular.min',
    'restangular': '/bower_components/restangular/dist/restangular.min',
    'lodash':      '/bower_components/lodash/dist/lodash.min',
    'jquery':      '/bower_components/jquery/dist/jquery.min',

    // Local dependencies
    'device': '/js/device',

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
    'domReady': {
      exports: 'domReady'
    }
  }
});
