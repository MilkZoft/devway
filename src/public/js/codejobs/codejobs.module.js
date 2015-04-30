'use strict';

define([
  'angular'
],
function(angular) {
  var codejobsApp = angular.module('codejobsApp', [
    'codejobsConstants',
    'restangular',
    'codejobs.usersService'
  ]);

  codejobsApp.config(CodejobsAppConfig);

  CodejobsAppConfig.$inject = [
    'CONFIG',
    '__',
    'RestangularProvider'
  ];

  function CodejobsAppConfig(CONFIG, __, RestangularProvider) {
    RestangularProvider.setBaseUrl(CONFIG.baseApi);
    RestangularProvider.setDefaultHttpFields({
      withCredentials: true
    });
  }

  return codejobsApp;
});
