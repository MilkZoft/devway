'use strict';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home/welcome', {
    name: req.session.user.username
  });
});

module.exports = router;
