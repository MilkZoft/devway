'use strict';

require(['domReady'], function(domReady) {
  domReady(function() {
    require([
      'restangular',

      // Constants
      'codejobs/codejobs.constants',

      // Main Module
      'codejobs/codejobs.controller',

      // Services
      'codejobs/components/services/users.module',

      // Directives
      'codejobs/components/directives/globalHeader.directive',
      'codejobs/components/directives/social.directive'
    ]);
  });
});
