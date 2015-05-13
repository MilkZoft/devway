'use strict';

var Model = require('../lib/helpers/model');
var Users = new Model();
var fields = '';

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
  }
};
