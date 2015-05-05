'use strict';

define(function() {
  // Loading dependencies
  require([
    'restangular',
    'codejobs/codejobs.constants',
    'codejobs/codejobs.controller',

    // Directives
    'codejobs/components/directives/globalHeader.directive',
    'codejobs/components/directives/social.directive',

    // Services
    'codejobs/components/services/users.module'
  ], function() {
    angular.bootstrap(document, ['codejobsApp']);
  });

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

  codejobsApp.run(['$log', function($log) {
    $log.info('Initialized the codejobsApp');
  }]);
});
