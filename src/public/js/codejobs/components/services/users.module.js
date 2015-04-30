'use strict';

define([
  'angular',
  'restangular'
],
function(angular, restangular) {
  angular
    .module('codejobs.usersService', ['restangular'])
    .factory('codejobsUsersService', CodejobsUsersService);

  CodejobsUsersService.$inject = ['Restangular'];

  function CodejobsUsersService(Restangular) {
    return {
      isConnected: function() {
        return Restangular.one('api/users/is-connected').get();
      }
    };
  }
});
