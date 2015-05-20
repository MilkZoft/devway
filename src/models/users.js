'use strict';

var Model = require('../lib/helpers/model');
var Users = new Model();
var fields = '';
var security = require('../lib/helpers/security');

module.exports = {
  getUser: function(user, callback) {
    var procedure = Users.getProcedure('getUser', user, [
      'network',
      'networkId',
      'username',
      'password'
    ]);

    Users.query(procedure, callback, function(result, callback) {
      var data = (result[0].length > 0) ? result[0] : false;

      callback(data);
    });
  },

  save: function(user, callback) {
    var procedure = Users.getProcedure('saveUser', user, [
      'network',
      'networkId',
      'username',
      'password',
      'email',
      'avatar',
      'subscribed'
    ], {
      password: 'encrypt'
    });

    Users.query(procedure, callback, function(result, callback) {
      callback(result);
    });
  }
};
