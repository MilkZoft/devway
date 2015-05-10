'use strict';

var config = require('../config');
var _ = require('lodash');
var security = require('./security');

module.exports = {
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
