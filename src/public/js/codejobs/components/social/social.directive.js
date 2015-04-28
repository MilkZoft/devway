'use strict';

define([
  'codejobsApp',
  'lodash',
  'utils'
],
function(codejobsApp, _, utils) {
  codejobsApp
    .directive('social', GlobalHeader);

  GlobalHeader.$inject = [
    'CONFIG'
  ];

  function GlobalHeader(CONFIG) {
    var template = CONFIG.baseApp + '/social/social.template.html';

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

  SocialController.$inject = ['CONFIG'];

  function SocialController(CONFIG) {
    var socialVm = this;

    socialVm.likes         = CONFIG.facebook.likes;
    socialVm.fbCounter     = CONFIG.facebook.counter;
    socialVm.followers     = CONFIG.twitter.followers;
    socialVm.twCounter     = CONFIG.twitter.counter;
    socialVm.subscribers   = CONFIG.youtube.subscribers;
    socialVm.ytCounter     = CONFIG.youtube.counter;
    socialVm.basePath      = CONFIG.basePath;

    socialVm.linkToNetwork = linkToNetwork;

    function linkToNetwork(obj) {
      return 'https://' + obj.network + '.com/' + CONFIG.socialAccount;
    }
  }
});
