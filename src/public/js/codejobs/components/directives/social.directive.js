'use strict';

define([
  'codejobsApp',
  'lodash'
],
function(codejobsApp, _) {
  codejobsApp
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

  codejobsApp
    .controller('SocialController', SocialController);

  SocialController.$inject = [
    'CONFIG'
  ];

  function SocialController(CONFIG) {
    var socialVm = this;

    // Properties
    socialVm.likes         = CONFIG.facebook.likes;
    socialVm.fbCounter     = CONFIG.facebook.counter;
    socialVm.followers     = CONFIG.twitter.followers;
    socialVm.twCounter     = CONFIG.twitter.counter;
    socialVm.subscribers   = CONFIG.youtube.subscribers;
    socialVm.ytCounter     = CONFIG.youtube.counter;
    socialVm.basePath      = CONFIG.basePath;

    // Methods
    socialVm.linkToNetwork = linkToNetwork;

    // Functions
    function linkToNetwork(obj) {
      return 'https://' + obj.network + '.com/' + CONFIG.socialAccount;
    }
  }
});
