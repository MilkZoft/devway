'use strict';

define(function() {
  // Loading dependencies
  require([
    'restangular',
    'codejobs/codejobs.controller',
    'codejobs/components/directives/globalHeader.directive',
    'codejobs/components/directives/social.directive'
  ], function() {
    angular.bootstrap(document, ['codejobsApp']);
  });

  var codejobsApp = angular.module('codejobsApp', [
    'codejobsConstants'
  ]);

  codejobsApp.config(CodejobsAppConfig);

  CodejobsAppConfig.$inject = [
    'CONFIG',
    '__'
  ];

  function CodejobsAppConfig(CONFIG, __) {
    console.log(CONFIG);
  }

  codejobsApp.run(['$log', function($log) {
    $log.info('Initialized the codejobsApp');
  }]);
});
