'use strict';

var config = require('../config');
var _ = require('lodash');
var security = require('./security');
var utils = require('./utils');

module.exports = {
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

    if (!hasClass && type !== 'hidden' && type !== 'checkbox' && type !== 'radio') {
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
