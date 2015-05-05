'use strict';

require.config({
  paths: {
    // General dependencies
    'angular': '/bower_components/angular/angular.min',
    'jquery':  '/bower_components/jquery/dist/jquery.min',
    'lodash': '/bower_components/lodash/dist/lodash.min',
    'restangular': '/bower_components/restangular/dist/restangular.min',

    // Local dependencies
    'device': '/js/device',

    'codejobsApp': 'codejobs/codejobs.module'
  },
  shim: {
    'angular': {
      deps: ['jquery'],
      exports: 'angular'
    },

    'jquery': {
      exports: '$'
    },

    'lodash': {
      exports: '_'
    },

    'restangular': {
      deps: ['angular'],
      exports: 'restangular'
    },

    'codejobsApp': {
      deps: ['angular']
    }
  }
});

require([
  'restangular',
  'device',
  'codejobs/codejobs.constants',
  'codejobsApp'
]);
