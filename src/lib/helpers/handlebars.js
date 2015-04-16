'use strict';

var config = require('../config');
var minify = require('html-minifier').minify;

module.exports = {
  debug: function(variable) {
    console.log('Debugging Handlebars:');
    console.log('=====================');
    console.log(this);

    console.log('Dumping Variable:');
    console.log('========================');
    console.log(variable);
  },

  minify: function(content) {
    if (config.server.views.minify) {
      return minify(content.fn(this), {
        removeComments: true,
        collapseWhitespace: true
      });
    }

    return content.fn(this);
  }
};
