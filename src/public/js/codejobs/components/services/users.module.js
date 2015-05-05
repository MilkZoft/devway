'use strict';

define(['angular'], function(angular) {
  var codejobsUsersService = angular.module('codejobs.usersService', [
    'restangular'
  ]);

  codejobsUsersService
    .factory('codejobsUsersService', CodejobsUsersService);

  CodejobsUsersService.$inject = [
    'Restangular'
  ];

  function CodejobsUsersService(Restangular) {
    return {
      isConnected: function() {
        return Restangular.one('users/is-connected').get();
      }
    };
  }

  codejobsUsersService.run(['$log', function($log) {
    $log.info('Inside Users Service');
  }]);
});
