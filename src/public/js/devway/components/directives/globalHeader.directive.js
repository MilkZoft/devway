'use strict';

define(['jquery'], function($) {
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
    globalHeaderVm.modal = modal;

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

    function modal(modal) {
      $('.modal').show();

      if (modal.type === 'login') {
        $('.register-modal').removeClass('slidedown').addClass('slideup');

        if ($('.login-modal').hasClass('slideup')) {
          $('.login-modal').removeClass('slideup').addClass('slidedown');
        } else {
          $('.login-modal').removeClass('slidedown').addClass('slideup');
        }
      } else {
        $('.login-modal').removeClass('slidedown').addClass('slideup');

        if ($('.register-modal').hasClass('slideup')) {
          $('.register-modal').removeClass('slideup').addClass('slidedown');
        } else {
          $('.register-modal').removeClass('slidedown').addClass('slideup');
        }
      }

      $('.close').on('click', function() {
        $('.register-modal').removeClass('slidedown').addClass('slideup');
        $('.login-modal').removeClass('slidedown').addClass('slideup');
      });
    }
  }

  devwayApp.run(['$log', function($log) {
    $log.info('Inside GlobalHeader Directive');
  }]);
});
