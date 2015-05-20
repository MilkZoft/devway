'use strict';

var config = require('../config');
var _ = require('lodash');
var utils = require('./utils');
var post = {};

module.exports = function(req, res, next) {
  res.getPost = getPost;
  res.validateSecurityToken = validateSecurityToken;
  res.refreshSecurityToken = refreshSecurityToken;
  res.getAllPost = getAllPost;

  next();

  function getAllPost(options) {
    var values = {};

    validateSecurityToken();

    if (utils.isUndefined(options)) {
      options = {
        exclude: []
      };
    }

    _.forEach(post, function(value, key) {
      if (options.exclude.length > 0) {
        if (!_.contains(options.exclude, key)) {
          values[key] = value;
        }
      } else {
        values[key] = value;
      }
    });

    refreshSecurityToken();

    return values;
  }

  function refreshSecurityToken() {
    if (config().refreshSecurityToken) {
      res.clearSession('securityToken');
    }
  }

  function validateSecurityToken() {
    if (config().validateSecurityToken) {
      if (res.session('securityToken') === req.body[utils.md5('securityToken')]) {
        post = req.body;
      } else {
        post = false;
      }
    } else {
      post = req.body;
    }
  }

  function getPost(options) {
    var input = options;
    var filter = 'strong';
    var value;

    if (options instanceof Array && options.length === 2) {
      input = options[0];
      filter = options[1];
    }

    if (typeof post[utils.md5(input)] !== 'undefined') {
      value = post[utils.md5(input)];

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
