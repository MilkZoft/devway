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

  json: function(content) {
    return JSON.stringify(content);
  },

  minify: function(content) {
    return minify(content.fn(this), {
      removeComments: true,
      collapseWhitespace: true,
      minifyJS: true
    });
  }
};
