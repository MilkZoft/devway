'use strict';

var config = require('../config');

var OAuth = require('oauth').OAuth;

var oauth = new OAuth(
  config().twitter.requestTokenUrl,
  config().twitter.accessTokenUrl,
  config().twitter.consumerKey,
  config().twitter.consumerSecret,
  config().twitter.APIVersion,
  config().twitter.callbackUrl,
  config().twitter.signMethod
);

var self = {
  api: function(url) {
    return config().twitter.APIUrl + url;
  },

  getAuthenticateUrl: function(oauthToken) {
    return config().twitter.authenticateUrl + '?oauth_token=' + oauthToken;
  },

  getOAuthRequestToken: function(callback) {
    oauth.getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results) {
      if (error) {
        console.log(error);
      } else {
        return callback([oauthToken, oauthTokenSecret]);
      }
    });
  },

  getOAuthAccessToken: function(token, tokenSecret, oauthVerifier, callback) {
    oauth.getOAuthAccessToken(token, tokenSecret, oauthVerifier,
      function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
        if (error) {
          console.log(error);
          return false;
        } else {
          var oauthSession = {
            'token': oauthAccessToken,
            'tokenSecret': oauthAccessTokenSecret
          };

          oauth.get(
            self.api('account/verify_credentials.json'),
            oauthAccessToken,
            oauthAccessTokenSecret,
            function(error, data) {
              data = JSON.parse(data);

              var userSession = {
                'networkId': data['id'],
                'username' : data['screen_name'],
                'avatar'   : data['profile_image_url']
              };

              return callback([oauthSession, userSession]);
            }
          );
        }
      }
    );
  }
};

module.exports = self;
