'use strict';

define(function() {
  var codejobsApp = angular.module('codejobsApp');

  codejobsApp.controller('CodejobsAppController', CodejobsAppController);

  CodejobsAppController.$inject = [
    '$scope',
    '__'
  ];

  function CodejobsAppController($scope, __) {
    var vm = this;

    vm.__ = __;
  }

  codejobsApp.run(['$log', function($log) {
    $log.info('Inside CodejobsAppController');
  }]);
});
