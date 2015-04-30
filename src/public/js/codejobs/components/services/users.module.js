'use strict';

define([
  'angular'
],
function(angular) {
  angular
    .module('codejobs.usersService', ['restangular'])
    .factory('codejobsUsersService', CodejobsUsersService);

  CodejobsUsersService.$inject = ['Restangular'];

  function CodejobsUsersService(Restangular) {
    return {
      isConnected: function() {
        return Restangular.one('users/is-connected').get();
      }
    };
  }
});
