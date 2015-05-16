'use strict';

var _ = require('lodash');
var utils = require('./utils');
var config = require('../config');

module.exports = function(req, res, next) {
  var configData = config();
  var cookiePrefix = 'dwSession_';
  var sessionData = parseSession();

  var options = {
    domain: configData.cookieDomain,
    path: '/',
    maxAge: 900000,
    httpOnly: true
  };

  var deleteOptions = {
    domain: configData.cookieDomain,
    path: '/',
    httpOnly: true
  };

  res.session = session;
  res.clearSession = clearSession;
  res.destroySessions = destroySessions;

  next();

  function parseSession() {
    var rVal = {};

    _.forEach(req.cookies, function(value, key) {
      var sessionPrefix = new RegExp('^' + cookiePrefix);
      var isSessionCookie = key.search(sessionPrefix) !== -1;

      if (isSessionCookie) {
        key = key.replace(sessionPrefix, '');

        if (utils.isJson(value)) {
          value = JSON.parse(value);
        }

        rVal[key] = value;
      }
    });

    return rVal;
  }

  function session(key, value) {
    var domain;
    var cookieKey;
    var cookieValue;

    // required params missing
    if (!key && !value) {
      return sessionData;
    }

    // retrieve value
    if (!value) {
      return sessionData[key];
    }

    // set value
    sessionData[key] = value;

    // set cookie
    cookieKey = cookiePrefix + key;
    cookieValue = typeof value === 'string' ? value : JSON.stringify(value);
    res.cookie(cookieKey, cookieValue, options);
  }

  function clearSession(key) {
    var cookieKey;

    if (!key) {
      return;
    }

    // clear value
    delete sessionData[key];

    cookieKey = cookiePrefix + key;
    res.clearCookie(cookieKey, deleteOptions);
  }

  function destroySessions() {
    if (sessionData) {
      var cookieKey;

      _.forEach(sessionData, function(value, key) {
        delete sessionData[key];

        cookieKey = cookiePrefix + key;
        res.clearCookie(cookieKey, deleteOptions);
      });
    } else {
      return;
    }
  }
};
