'use strict';

var config = require('../config');
var minify = require('html-minifier').minify;
var form   = require('./form');
var utils  = require('./utils');
var social = require('./social');

module.exports = {
  // String helpers
  debug: function(variable) {
    console.log('Debugging Handlebars:');
    console.log('=====================');
    console.log(this);

    console.log('Dumping Variable:');
    console.log('========================');
    console.log(variable);
  },

  lowercase: function(str) {
    return str.toLowerCase();
  },

  uppercase: function(str) {
    return str.toUpperCase();
  },

  reverse: function(str) {
    return str.split('').reverse().join('');
  },

  // Numbers helpers
  ceil: function(number) {
    return Math.ceil(parseFloat(number));
  },

  // Date helpers
  now: function() {
    return new Date();
  },

  // Conditionals helpers
  is: function(variable, value, options) {
    if (variable && variable === value) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },

  isNot: function(variable, value, options) {
    if (!variable || variable !== value) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },

  gt: function(value1, value2, options) {
    if (value1 > value2) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },

  gte: function(value1, value2, options) {
    if (value1 >= value2) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },

  lt: function(value1, value2, options) {
    if (value1 < value2) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },

  lte: function(value1, value2, options) {
    if (value1 <= value2) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },

  // HTML & Json helpers
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

  // Forms helpers
  input: function(options) {
    if (!utils.isUndefined(options.hash)) {
      return form.createInput(options.hash);
    }
  },

  hidden: function(options) {
    options.hash.type = 'hidden';

    if (!utils.isUndefined(options.hash)) {
      return form.createInput(options.hash);
    }
  },

  token: function(securityToken) {
    var options = {};

    if (!utils.isUndefined(securityToken)) {
      options.type  = 'hidden';
      options.name  = 'securityToken';
      options.value = securityToken;

      return form.createInput(options);
    }
  },

  checkbox: function(options) {
    if (!utils.isUndefined(options.hash)) {
      options.hash.type = 'checkbox';

      return form.createInput(options.hash);
    }
  },

  radio: function(options) {
    if (!utils.isUndefined(options.hash)) {
      options.hash.type = 'radio';

      return form.createInput(options.hash);
    }
  },

  label: function(options) {
    if (!utils.isUndefined(options.hash)) {
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

    if (!utils.isUndefined(options.hash)) {
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
