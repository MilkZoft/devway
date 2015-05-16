'use strict';

var config = require('../config');
var _ = require('lodash');
var security = require('./security');
var utils = require('./utils');
var post = {};

module.exports = {
  load: function(body, securityToken) {
    if (body[security.md5('securityToken')] === security.md5(securityToken)) {
      post = body;
    } else {
      return false;
    }
  },

  get: function(options) {
    var input = options;
    var filter = 'strong';
    var value;

    if (options instanceof Array && options.length === 2) {
      input = options[0];
      filter = options[1];
    }

    if (typeof post[security.md5(input)] !== 'undefined') {
      value = post[security.md5(input)];

      if (filter === 'escape') {
        value = utils.escape(value);
      } else if (filter === 'html') {
        value = utils.removeHTML(value);
      } else if (filter === 'strong') {
        value = utils.escape(utils.removeHTML(value));
      }

      return value;
    } else {
      return false;
    }
  },

  createLabel: function(attrs, text) {
    var html = '<label ';

    _.forIn(attrs, function(value, attr) {
      html += attr + '="' + value + '" ';
    });

    html += '>' + text + '</label>';

    return html;
  },

  createInput: function(attrs) {
    var html = '<input ';
    var type = attrs.type;
    var hasType = attrs.hasOwnProperty('type');
    var hasClass = attrs.hasOwnProperty('class');

    if (!hasType) {
      html += 'type="text" ';
    }

    if (!hasClass && type !== ' hidden' && type !== 'checkbox' && type !== 'radio') {
      html += 'class="input" ';
    }

    _.forIn(attrs, function(value, attr) {
      if (attr === 'name') {
        value = security.md5(value);
      }

      html += attr + '="' + value + '" ';
    });

    html += ' />';

    return html;
  }
};
