'use strict';

define(function() {
  var devwayApp = angular.module('devwayApp');

  devwayApp
    .directive('social', Social);

  Social.$inject = [
    'CONFIG'
  ];

  function Social(CONFIG) {
    var template = CONFIG.baseApp + '/directives/templates/social.template.html';

    return {
      restrict: 'E',
      controller: 'SocialController',
      bindToController: true,
      templateUrl: template,
      controllerAs: 'socialVm',
      scope: {
        i18n: '='
      }
    };
  }

  devwayApp
    .controller('SocialController', SocialController);

  SocialController.$inject = [
    'CONFIG'
  ];

  function SocialController(CONFIG) {
    var socialVm = this;

    // Properties
    socialVm.basePath = CONFIG.basePath;

    // Methods
    socialVm.linkToNetwork = linkToNetwork;

    // Functions
    function linkToNetwork(obj) {
      return 'https://' + obj.network + '.com/' + CONFIG.socialAccount;
    }
  }

  devwayApp.run(['$log', function($log) {
    $log.info('Inside Social Directive');
  }]);
});
