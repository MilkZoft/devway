'use strict';

var db = require('../db/mysql');
var utils = require('./utils');
var _ = require('lodash');

module.exports = function(schema) {
  return {
    getProcedure: function(procedure, values, fields, filters) {
      var params = '';
      var i = 0;
      var total = fields.length - 1;
      var value;
      var keys = _.keys(values);
      var encrypted = false;
      var method;

      filters = filters || {};

      if (utils.isUndefined(filters)) {
        filters = {};
      }

      if (keys[0].length === 32) {
        encrypted = true;
      }

      _.forEach(fields, function(field) {
        value = values[(encrypted) ? utils.md5(field) : field];

        if (value === 'on') {
          value = 1;
        }

        if (utils.isUndefined(value)) {
          value = '';
        }

        if (field === 'networkId') {
          value = '\'' + utils.clean(value.toString()) + '\'';
        }

        if (!utils.isNumber(value)) {
          method = filters[field];

          if (utils.isDefined(method) && utils.isFunction(utils[method])) {
            value = '\'' + utils[method](value) + '\'';
          } else {
            value = '\'' + utils.clean(value) + '\'';
          }
        }

        if (i === total) {
          params += value;
        } else {
          params += value + ', ';
          i++;
        }
      });

      procedure = 'CALL ' + procedure + '(' + params + ');';

      return procedure.replace(new RegExp(', ,', 'g'), ', \'\',');
    },

    query: function(sql, callback, fn) {
      this.executeQuery(sql, function(error, result) {
        fn(result, callback);
      });
    },

    get: function(q, callback) {
      if (q === 'all') {
        schema.fields = schema.fields;

        db.findAll({
          table:  schema.table,
          fields: schema.fields,
          group:  schema.group,
          order:  schema.order,
          limit:  schema.limit
        }, callback);
      } else if (!isNaN(q)) {
        schema.key = schema.key;
        schema.fields = schema.fields;

        db.find({
          id:     parseInt(q),
          table:  schema.table,
          fields: schema.fields,
          key:    schema.key
        }, callback);
      } else if (typeof (q) === 'object') {
        var fields = Object.keys(q);
        var count = fields.length - 1;
        var query = '';

        if (fields.length > 1) {
          for (var i = 0; i <= count; i++) {
            if (i === count) {
              query += fields[i] + ' = \'' + q[fields[i]] + '\'';
            } else {
              query += fields[i] + ' = \'' + q[fields[i]] + '\' AND ';
            }
          }

          db.findBySQL({
            query:  query,
            table:  schema.table,
            fields: schema.fields,
            group:  schema.group,
            order:  schema.order,
            limit:  schema.limit
          }, callback);
        } else {
          var field = fields[0];
          var value = q[field];

          db.findBy({
            field:  field,
            value:  value,
            table:  schema.table,
            fields: schema.fields,
            group:  schema.group,
            order:  schema.order,
            limit:  schema.limit
          }, callback);
        }
      }

      return false;
    },

    executeQuery: function(sql, callback) {
      db.query(sql, callback);
    }
  };
};
