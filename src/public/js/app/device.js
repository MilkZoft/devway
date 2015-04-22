'use strict';

define(['jquery'], function($) {
  var device = 'desktop';
  var width  = window.screen.width;
  var height = window.screen.height;
  var css;

  var current = width + height;
  var devices = [];

  devices[768 + 1024] = 'ipad';
  devices[414 +  736] = 'iphone6p';
  devices[375 +  667] = 'iphone6';
  devices[320 +  568] = 'iphone5';
  devices[320 +  480] = 'iphone4';

  if (typeof devices[current] !== 'undefined') {
    device = devices[current];
  } else if (width < 1024) {
    device = 'any';
  }

  css = '/css/mediaqueries/' + device + '.css';

  $('head').append('<link href="' + css + '" rel="stylesheet" type="text/css" />');
});
