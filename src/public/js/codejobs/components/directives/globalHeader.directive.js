'use strict';

define(function() {
  var codejobsApp = angular.module('codejobsApp');

  codejobsApp
    .directive('globalHeader', GlobalHeader);

  GlobalHeader.$inject = [
    'CONFIG'
  ];

  function GlobalHeader(CONFIG) {
    var template = CONFIG.baseApp + '/directives/templates/globalHeader.template.html';

    return {
      restrict: 'E',
      controller: 'GlobalHeaderController',
      bindToController: true,
      templateUrl: template,
      controllerAs: 'globalHeaderVm',
      scope: {
        i18n: '='
      }
    };
  }

  codejobsApp
    .controller('GlobalHeaderController', GlobalHeaderController);

  GlobalHeaderController.$inject = [
    'CONFIG'
  ];

  function GlobalHeaderController(CONFIG) {
    var globalHeaderVm = this;

    // Properties
    globalHeaderVm.basePath = CONFIG.basePath;

    // Methods
    globalHeaderVm.isConnected = isConnected;

    // Invoking functions
    globalHeaderVm.isConnected();

    // Functions
    function isConnected() {
      globalHeaderVm.isConnected = false;
    }
  }

  codejobsApp.run(['$log', function($log) {
    $log.info('Inside GlobalHeader Directive');
  }]);
});
