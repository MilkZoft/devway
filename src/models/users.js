var Model = require('../lib/helpers/model');
var Users = new Model();
var fields = '';

module.exports = {
  getAll: function(params, callback) {
    var sql = '';
    var language = global.lang.current;
    var page = (typeof(params.page) !== 'undefined') ? params.page : 0;

    sql = 'CALL getPosts(\'' + language + '\', \'' + page + '\', \'' + 10 + '\');';

    Model.executeQuery(Users, sql, callback, function(result, callback) {
      var total = (typeof(result) !== 'undefined') ? result[0][0].total : 0;
      var posts = (typeof(result) !== 'undefined') ? result[1] : [];

      callback(total, posts);
    });
  }
};
