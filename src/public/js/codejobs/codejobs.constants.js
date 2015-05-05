'use strict';

define(function() {
  var codejobsConstants = angular.module('codejobsConstants', []);

  codejobsConstants
    .constant('CONFIG', window.codejobsConfig.config)
    .constant('__', JSON.parse(window.codejobsConfig.i18n));

  codejobsConstants.run(['$log', function($log) {
    $log.info('Inside Codejobs.constants');
  }]);
});
