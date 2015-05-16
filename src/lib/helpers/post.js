'use strict';

var config = require('../config');
var _ = require('lodash');
var security = require('./security');
var utils = require('./utils');
var post = {};

module.exports = function(req, res, next) {
  res.getPost = getPost;

  next();

  function refreshSecurityToken() {
    if (config().refreshSecurityToken) {
      res.clearSession('securityToken');
    }
  }

  function validateSecurityToken() {
    if (res.session('securityToken') === req.body[security.md5('securityToken')]) {
      post = req.body;
    } else {
      post = false;
    }
  }

  function getPost(options) {
    validateSecurityToken();

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

      // Refreshing securityToken for next request
      refreshSecurityToken();

      return value;
    } else {
      return false;
    }
  }
};
