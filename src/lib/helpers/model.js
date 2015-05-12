'use strict';

var db = require('../db/mysql');

module.exports = function(schema) {
  return {
    executeQuery: function(model, sql, callback, fn) {
      model.query(sql, function(error, result) {
        console.log(result);
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

    query: function(sql, callback) {
      db.query(sql, callback);
    }
  };
};
