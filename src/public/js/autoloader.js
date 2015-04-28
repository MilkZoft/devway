'use strict';

require(['domReady'], function(domReady) {
  domReady(function() {
    require([
      'codejobsConstants',
      'codejobs/codejobs.controller',
      'codejobs/components/globalHeader/globalHeader.directive',
      'codejobs/components/social/social.directive'
    ]);
  });
});
