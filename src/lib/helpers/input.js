'use strict';

var config = require('../config');
var _ = require('lodash');
var security = require('./security');
var utils = require('./utils');
var post = {};

module.exports = function(req, res, next) {
  res.getInput = getInput;

  next();

  function getInput(options) {
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
  }
};
