(function() {
  'use strict';

  define(function(require) {
    var angular = require('angular');

    var devwayUsersService = angular.module('devway.usersService', [
      'restangular'
    ]);

    devwayUsersService
      .factory('devwayUsersService', DevwayUsersService);

    DevwayUsersService.$inject = [
      'Restangular'
    ];

    function DevwayUsersService(Restangular) {
      return {
        isConnected: function() {
          return Restangular.one('users/is-connected').get();
        }
      };
    }

    devwayUsersService.run(['$log', function($log) {
      $log.info('Inside Users Service');
    }]);
  });
})();
