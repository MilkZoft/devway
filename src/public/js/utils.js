'use strict';

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['lodash'], factory);
  } else {
    root.Codejobs = root.Codejobs || {};
    root.Codejobs.Utils = factory(root._);
  }
}(window, function(_) {
  return {
    isJson: isJson,
    stripTrailingSlash: stripTrailingSlash,
    arraysAreEqual: arraysAreEqual
  };

  function isJson(str) {
    if (str === null) {
      return false;
    }

    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }

    return true;
  }

  function stripTrailingSlash(str) {
    if (str.substr(-1) === '/') {
      return str.substr(0, str.length - 1);
    }

    return str;
  }

  function arraysAreEqual(array1, array2) {
    var result;

    if (!(array1 instanceof Array) || !(array2 instanceof Array)) {
      return false;
    }

    if (array1.length !== array2.length) {
      return false;
    }

    result = _.every(array1, function(val1, index) {
      var val2 = array2[index];
      var val1IsArray = val1 instanceof Array;
      var val2IsArray;

      if (val1IsArray) {
        val2IsArray = val2 instanceof Array;

        if (!val2IsArray || !arraysAreEqual(val1, val2)) {
          return false;
        }

        return true;
      }

      if (!_.isEqual(val1, val2)) {
        return false;
      }

      return true;
    });

    return result;
  }
}));
