/*globals Codejobs */

'use strict';

describe('Codejobs Utils', function() {
  var utils;

  before(function() {
    utils = Codejobs.Utils;
  });

  it('should be an object', function() {
    assert.typeOf(Codejobs.Utils, 'Object', 'Codejobs.Utils should be an object');
  });

  describe('#isJson', function() {
    it('should be a function', function() {
      assert.typeOf(
        utils.isJson,
        'Function',
        'isJson should be a function'
      );
    });

    it('returns false if the argument is not a json string', function() {
      var response = utils.isJson('test string');
      assert.isFalse(response, 'isJson should return false');
    });

    it('returns false if the argument is null', function() {
      var response = utils.isJson(null);
      assert.isFalse(response, 'isJson should return false');
    });

    it('returns false if the argument is undefined', function() {
      var response = utils.isJson();
      assert.isFalse(response, 'isJson should return false');
    });

    it('returns true if argument is valid json', function() {
      var validJson = window.__html__['test/fixtures/public/js/utils/valid.json'];
      var response = utils.isJson(validJson);
      assert.isTrue(response, 'isJson should return true');
    });
  });
});
