'use strict';

define(['angular'], function(angular, _) {
  angular
    .module('codejobsConstants', [])
      .constant('CONFIG', window.codejobsConfig.config)
      .constant('__', JSON.parse(window.codejobsConfig.i18n));
});
