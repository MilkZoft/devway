'use strict';

define(['angular'], function(angular) {
  var codejobsApp = angular
    .module('codejobsApp', [
      'codejobsConstants'
    ])
    .config(CodejobsAppConfig);

    CodejobsAppConfig.$inject = [
      'CONFIG',
      '__',
      '$interpolateProvider'
    ];

    function CodejobsAppConfig(CONFIG, __, $interpolateProvider) {
      //$interpolateProvider.startSymbol('[[').endSymbol(']]');
    }

  return codejobsApp;
});
