'use strict';

var Model = require('../lib/helpers/model');
var Users = new Model();
var fields = '';
var security = require('../lib/helpers/security');

module.exports = {
  getUser: function(user, callback) {
    var params  = '\'' + user.network   + '\', ';
        params += '\'' + user.networkId + '\', ';
        params += '\'' + user.username  + '\', ';
        params += '\'' + user.password  + '\'';

    var sql = 'CALL getUser(' + params + ');';

    Users.query(sql, callback, function(result, callback) {
      var data = (result[0].length > 0) ? result[0] : false;

      callback(data);
    });
  },

  save: function(user, callback) {
    var params  = '\'' + user[security.md5('network')]   + '\', ';
        params += '\'' + user[security.md5('networkId')] + '\', ';
        params += '\'' + user[security.md5('username')]  + '\', ';
        params += '\'' + user[security.md5('password')]  + '\', ';
        params += '\'' + user[security.md5('email')]     + '\', ';
        params += '\'' + user[security.md5('avatar')]    + '\', ';
        params += (user[security.md5('subscribed')]) ? 1 : 0;

    var sql = 'CALL saveUser(' + params + ');';

    Users.query(sql, callback, function(result, callback) {
      callback(result);
    });
  }
};
