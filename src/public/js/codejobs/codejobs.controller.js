'use strict';

define(['codejobsApp'], function(codejobsApp) {
  codejobsApp
    .controller('CodejobsAppController', CodejobsAppController);

  CodejobsAppController.$inject = [
    '$scope',
    '__'
  ];

  function CodejobsAppController($scope, __) {
    var vm = this;

    vm.__ = __;
  }
});
