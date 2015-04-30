'use strict';

define([
  'angular'
],
function(angular) {
  var codejobsApp = angular.module('codejobsApp', [
    'codejobsConstants',
    'codejobs.usersService'
  ]);

  codejobsApp.config(CodejobsAppConfig);

  CodejobsAppConfig.$inject = [
    'CONFIG',
    '__'
  ];

  function CodejobsAppConfig(CONFIG, __) {

  }

  return codejobsApp;
});
