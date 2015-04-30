'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({
    'message': 'Welcome to Codejobs API'
  });
});

router.get('/users/is-connected', function(req, res, next) {
  if (typeof req.session.user !== 'undefined') {
    res.json({
      'isConnected': true,
      'user': {
        'networkId': req.session.user.networkId,
        'username': req.session.user.username,
        'avatar': req.session.user.avatar
      }
    });
  } else {
    res.json({
      'isConnected': false
    });
  }
});

module.exports = router;
