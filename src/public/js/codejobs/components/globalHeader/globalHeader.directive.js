'use strict';

define([
  'codejobsApp',
  'lodash',
  'utils'
],
function(codejobsApp, _, utils) {
  codejobsApp
    .directive('globalHeader', GlobalHeader);

  GlobalHeader.$inject = [
    'CONFIG'
  ];

  function GlobalHeader(CONFIG) {
    var template = CONFIG.baseApp + '/globalHeader/globalHeader.template.html';

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

  GlobalHeaderController.$inject = ['CONFIG'];

  function GlobalHeaderController(CONFIG) {
    var globalHeaderVm = this;

    globalHeaderVm.basePath = CONFIG.basePath;
  }
});
