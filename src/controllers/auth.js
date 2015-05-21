'use strict';

var express = require('express');
var router  = express.Router();
var config  = require('../lib/config');
var twitter = require('../lib/helpers/twitter');

router.get('/twitter', function(req, res) {
  twitter.getOAuthRequestToken(function(tokens) {
    var oauthSession = {
      'token': tokens[0],
      'tokenSecret': tokens[1]
    };

    res.session('oauth', oauthSession);
    res.redirect(twitter.getAuthenticateUrl(tokens[0]));
  });
});

router.get('/twitter/callback', function(req, res) {
  var oauthData = res.session('oauth');

  if (oauthData) {
    var oauthVerifier = req.query['oauth_verifier'];

    twitter.getOAuthAccessToken(
      oauthData.token,
      oauthData.tokenSecret,
      oauthVerifier,
      function(sessions) {
        res.session('oauth', sessions[0]);
        res.session('user', sessions[1]);

        res.redirect(res.locals.basePath + '/users/validation');
      }
    );
  }
});

module.exports = router;
