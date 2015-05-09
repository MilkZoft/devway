(function() {
  'use strict';

  define(function(require) {
    // Loading dependencies
    require([
      'restangular',
      'devway/devway.constants',
      'devway/devway.controller',

      // Directives
      'devway/components/directives/globalHeader.directive',

      // Services
      'devway/components/services/users.module'
    ], function() {
      angular.bootstrap(document, ['devwayApp']);
    });

    var angular = require('angular');

    var devwayApp = angular.module('devwayApp', [
      'devwayConstants',
      'restangular',
      'devway.usersService'
    ]);

    devwayApp.config(DevwayAppConfig);

    DevwayAppConfig.$inject = [
      'CONFIG',
      '__',
      'RestangularProvider'
    ];

    function DevwayAppConfig(CONFIG, __, RestangularProvider) {
      RestangularProvider.setBaseUrl(CONFIG.baseApi);
      RestangularProvider.setDefaultHttpFields({
        withCredentials: true
      });
    }

    devwayApp.run(['$log', function($log) {
      $log.info('Initialized the devwayApp');
    }]);
  });
})();
