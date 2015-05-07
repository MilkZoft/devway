'use strict';

define(function() {
  var devwayConstants = angular.module('devwayConstants', []);

  devwayConstants
    .constant('CONFIG', window.devwayConfig.config)
    .constant('__', JSON.parse(window.devwayConfig.i18n));

  devwayConstants.run(['$log', function($log) {
    $log.info('Inside devway.constants');
  }]);
});
