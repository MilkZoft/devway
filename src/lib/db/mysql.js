'use strict';

var mysql = require('mysql');
var config = require('../config');

var connection = mysql.createConnection({
  port: config().database.mysql.port,
  host: config().database.mysql.host,
  user: config().database.mysql.user,
  password: config().database.mysql.password,
  database: config().database.mysql.database
});

module.exports = {
  find: function(obj, callback) {
    if (!obj.id || !obj.table) {
      return false;
    }

    var fields = (obj.fields) ? obj.fields : '*';
    var sql  = 'SELECT ' + fields    + ' ';
        sql += 'FROM '   + obj.table + ' ';
        sql += 'WHERE '  + obj.key   + ' = ' + obj.id;

    connection.query(sql, callback);
  },

  findAll: function(obj, callback) {
    if (!obj.table) {
      return false;
    }

    var fields = (obj.fields) ? obj.fields : '*';
    var group  = (obj.group)  ? ' GROUP BY ' + obj.group + ' ' : '';
    var order  = (obj.order)  ? ' ORDER BY ' + obj.order + ' ' : '';
    var limit  = (obj.limit)  ? ' LIMIT '    + obj.limit + ' ' : '';

    var sql    = 'SELECT ' + fields    + ' ';
        sql   += 'FROM '   + obj.table + ' ';
        sql   += group;
        sql   += order;
        sql   += limit;

    connection.query(sql, callback);
  },

  findBy: function(obj, callback) {
    if (!obj.table) {
      return false;
    }

    var fields = (obj.fields) ? obj.fields : '*';
    var group  = (obj.group)  ? ' GROUP BY ' + obj.group + ' ' : '';
    var order  = (obj.order)  ? ' ORDER BY ' + obj.order + ' ' : '';
    var limit  = (obj.limit)  ? ' LIMIT '    + obj.limit + ' ' : '';

    var sql    = 'SELECT ' + fields    + ' ';
        sql   += 'FROM '   + obj.table + ' ';
        sql   += 'WHERE '  + obj.field + ' = \'' + obj.value + '\'';
        sql   += group;
        sql   += order;
        sql   += limit;

    connection.query(sql, callback);
  },

  findBySQL: function(obj, callback) {
    if (!obj.table) {
      return false;
    }

    if (!obj.query) {
      return false;
    }

    var fields = (obj.fields) ? obj.fields : '*';
    var group  = (obj.group)  ? ' GROUP BY ' + obj.group + ' ' : '';
    var order  = (obj.order)  ? ' ORDER BY ' + obj.order + ' ' : '';
    var limit  = (obj.limit)  ? ' LIMIT '    + obj.limit + ' ' : '';

    var sql    = 'SELECT ' + fields    + ' ';
        sql   += 'FROM '   + obj.table + ' ';
        sql   += 'WHERE '  + obj.query + ' ';
        sql   += group;
        sql   += order;
        sql   += limit;

    connection.query(sql, callback);
  },

  findFirst: function(obj, callback) {
    if (!obj.table) {
      return false;
    }

    var fields = (obj.fields) ? obj.fields : '*';
    var sql    = 'SELECT ' + fields    + ' ';
        sql   += 'FROM '   + obj.table + ' ';
        sql   += 'LIMIT 1';

    connection.query(sql, callback);
  },

  findLast: function(obj, callback) {
    if (!obj.table || !obj.key) {
      return false;
    }

    var fields = (obj.fields) ? obj.fields : '*';
    var sql    = 'SELECT ' + fields    + ' ';
        sql   += 'FROM '   + obj.table + ' ';
        sql   += 'ORDER BY ' + obj.key + ' DESC LIMIT 1';

    connection.query(sql, callback);
  },

  query: function(sql, callback) {
    if (!sql) {
      return false;
    }

    connection.query(sql, callback);
  }
};
