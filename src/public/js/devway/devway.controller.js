'use strict';

define(function() {
  var devwayApp = angular.module('devwayApp');

  devwayApp.controller('DevwayAppController', DevwayAppController);

  DevwayAppController.$inject = [
    '$scope',
    '__'
  ];

  function DevwayAppController($scope, __) {
    var vm = this;

    vm.__ = __;
  }

  devwayApp.run(['$log', function($log) {
    $log.info('Inside DevwayAppController');
  }]);
});
