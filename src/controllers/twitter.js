'use strict';

var express = require('express');
var router  = express.Router();
var config  = require('../lib/config');
var twitter = require('../lib/helpers/twitter');

router.get('/', function(req, res) {
  twitter.getOAuthRequestToken(function(tokens) {
    req.session.oauth = {
      'token': tokens[0],
      'tokenSecret': tokens[1]
    };

    res.redirect(twitter.getAuthenticateUrl(tokens[0]));
  });
});

router.get('/callback', function(req, res) {
  var oauthData = req.session.oauth;

  if (oauthData) {
    var oauthVerifier = req.query['oauth_verifier'];

    twitter.getOAuthAccessToken(
      oauthData.token,
      oauthData.tokenSecret,
      oauthVerifier,
      function(sessions) {
        req.session.oauth = sessions[0];
        req.session.user  = sessions[1];

        res.redirect(res.locals.basePath);
      }
    );
  }
});

module.exports = router;
