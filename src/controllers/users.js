'use strict';

var express = require('express');
var router = express.Router();
var usersModel = require('../models/users');

router.get('/validation', function(req, res, next) {
  if (typeof req.session.user !== 'undefined' && typeof req.session.oauth !== 'undefined') {
    var connectedUser = req.session.user;
    var user = usersModel.getUser({
      network: connectedUser.network,
      networkId: connectedUser.networkId,
      username: connectedUser.username,
      password: false
    }, function(userInfo) {
      if (userInfo) {
        res.end('Logged in');
      } else {
        res.end('Registration');
      }
    });
  } else {
    res.redirect('/');
  }
});

router.get('/logout', function(req, res, next) {
  req.session.destroy();

  res.redirect('/');
});

router.get('/login', function(req, res, next) {
  res.render('users/login');
});

router.get('/register', function(req, res, next) {
  res.render('users/register');
});

module.exports = router;
