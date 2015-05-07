'use strict';

define(function() {
  var devwayApp = angular.module('devwayApp');

  devwayApp
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

  devwayApp
    .controller('GlobalHeaderController', GlobalHeaderController);

  GlobalHeaderController.$inject = [
    'CONFIG',
    'devwayUsersService'
  ];

  function GlobalHeaderController(CONFIG, codejobsUsersService) {
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

      codejobsUsersService
        .isConnected()
        .then(function(response) {
          globalHeaderVm.isConnected = response.isConnected;

          if (response.isConnected) {
            globalHeaderVm.networkId = response.user.networkId;
            globalHeaderVm.username  = response.user.username;
            globalHeaderVm.avatar    = response.user.avatar;
          }
        });
    }
  }

  devwayApp.run(['$log', function($log) {
    $log.info('Inside GlobalHeader Directive');
  }]);
});
