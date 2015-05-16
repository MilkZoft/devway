'use strict';

var express = require('express');
var router = express.Router();
var utils = require('../lib/helpers/utils');

router.get('/', function(req, res, next) {
  res.json({
    'message': 'Welcome to Codejobs API'
  });
});

router.get('/users/is-connected', function(req, res, next) {
  if (!utils.isUndefined(res.session('user'))) {
    res.json({
      'isConnected': true,
      'user': {
        'networkId': res.session('user').networkId,
        'username': res.session('user').username,
        'avatar': res.session('user').avatar
      }
    });
  } else {
    res.json({
      'isConnected': false
    });
  }
});

module.exports = router;
