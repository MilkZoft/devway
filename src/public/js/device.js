'use strict';

define([], function() {
  var device  = 'desktop';
  var width   = window.screen.width;
  var height  = window.screen.height;
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

  var head = document.getElementsByTagName('head')[0];
  var link = document.createElement('link');

  link.rel   = 'stylesheet';
  link.type  = 'text/css';
  link.href  = '/css/mediaqueries/' + device + '.css';
  link.media = 'all';

  head.appendChild(link);
});
