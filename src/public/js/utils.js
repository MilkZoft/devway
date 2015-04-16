'use strict';

(function(root, factory) {
  root.Codejobs = root.Codejobs || {};
  root.Codejobs.Utils = factory();
}(window, function() {
  return {
    isJson: isJson
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
}));
