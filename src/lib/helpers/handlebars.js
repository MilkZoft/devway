'use strict';

var config = require('../config');
var minify = require('html-minifier').minify;
var form   = require('./form');
var social = require('./social');

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
  },

  input: function(options) {
    if (typeof options.hash !== 'undefined') {
      return form.createInput(options.hash);
    }
  },

  checkbox: function(options) {
    options.hash.type = 'checkbox';

    if (typeof options.hash !== 'undefined') {
      return form.createInput(options.hash);
    }
  },

  label: function(options) {
    if (typeof options.hash !== 'undefined') {
      var labelText = (options.hash.text) ? options.hash.text : '';
      return form.createLabel(options.hash, labelText);
    }
  },

  icon: function(icon) {
    return '<i class="fa ' + icon + '"></i>';
  },

  socialButtons: function(options) {
    var networks = [];
    var network = {};

    if (typeof options.hash !== 'undefined') {
      if (options.hash.facebook) {
        network = {
          name: 'facebook',
          text: options.hash.facebookText,
          link: options.hash.facebookLink
        };

        networks.push(network);
      }

      if (options.hash.twitter) {
        network = {
          name: 'twitter',
          text: options.hash.twitterText,
          link: options.hash.twitterLink
        };

        networks.push(network);
      }
    }

    return social.createButtons(networks);
  }
};
