'use strict';

var express = require('express');
var router = express.Router();
var usersModel = require('../models/users');
var security = require('../lib/helpers/security');
var utils = require('../lib/helpers/utils');

/* GET actions */
router.get('/validation', function(req, res, next) {
  if (!utils.isUndefined(res.session('user')) && !utils.isUndefined(res.session('oauth'))) {
    var connectedUser = res.session('user');

    var user = usersModel.getUser({
      network: connectedUser.network,
      networkId: connectedUser.networkId,
      username: connectedUser.username,
      password: false
    }, function(userInfo) {
      if (userInfo) {
        res.redirect('/');
      } else {
        res.redirect('/users/register');
      }
    });
  } else {
    res.redirect('/');
  }
});

router.get('/logout', function(req, res, next) {
  res.destroySessions();

  res.redirect('/');
});

router.get('/login', function(req, res, next) {
  res.render('users/login');
});

router.get('/register', function(req, res, next) {
  if (!utils.isUndefined(res.session('user')) && !utils.isUndefined(res.session('oauth'))) {
    var connectedUser = res.session('user');

    res.clearSession(['user', 'oauth']);

    res.render('users/register', {
      user: connectedUser
    });
  } else {
    res.render('users/register', {
      user: false
    });
  }
});

/* POST actions */
router.post('/registration', function(req, res, next) {
  res.send(res.getPost('username'));
});

module.exports = router;
