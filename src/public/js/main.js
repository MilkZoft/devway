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

    'devwayApp': 'devway/devway.module'
  },

  priority: ['angular'],

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
      deps: ['angular', 'lodash'],
    },

    'devwayApp': {
      deps: ['angular']
    }
  }
});

require([
  'device',
  'devwayApp'
]);
