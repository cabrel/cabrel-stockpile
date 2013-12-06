var expect = require('expect.js'),
    stockpile = require('../'),
    checks = stockpile.checks;


describe('checks', function() {
  describe('#isUndefined', function() {
    it('return true when given undefined', function() {
      var a = undefined;

      var result = checks.isUndefined(a);

      expect(result).to.be(true);
    });

    it('return false when given a defined value', function() {
      var a = 1;

      var result = checks.isUndefined(a);

      expect(result).to.be(false);
    });
  });

  describe('#isDefined', function() {
    it('return true when given a defined value', function() {
      var a = 1;

      var result = checks.isDefined(a);

      expect(result).to.be(true);
    });

    it('return false when given an undefined value', function() {
      var a = undefined;

      var result = checks.isDefined(a);

      expect(result).to.be(false);
    });
  });

  describe('#isObject', function() {
    it('return true when given an object', function() {
      var a = { 'b': 1 };

      var result = checks.isObject(a);

      expect(result).to.be(true);
    });

    it('return false when not given an object', function() {
      var a = 1;

      var result = checks.isObject(a);

      expect(result).to.be(false);
    });
  });

  describe('#isString', function() {
    it('return true when given a string', function() {
      var a = 'b';

      var result = checks.isString(a);

      expect(result).to.be(true);
    });

    it('return false when not given a string', function() {
      var a = 1;

      var result = checks.isString(a);

      expect(result).to.be(false);
    });
  });

  describe('#isNumber', function() {
    it('return true when given a number', function() {
      var a = 1;

      var result = checks.isNumber(a);

      expect(result).to.be(true);
    });

    it('return false when not given a number', function() {
      var a = '1';

      var result = checks.isNumber(a);

      expect(result).to.be(false);
    });
  });

  describe('#isDate', function() {
    it('return true when given a date object', function() {
      var a = new Date();

      var result = checks.isDate(a);

      expect(result).to.be(true);
    });

    it('return false when not given a date object', function() {
      var a = '11/14/2013';

      var result = checks.isDate(a);

      expect(result).to.be(false);
    });
  });

  describe('#isArray', function() {
    it('return true when given an array', function() {
      var a = [1];

      var result = checks.isArray(a);

      expect(result).to.be(true);
    });

    it('return false when not given an array', function() {
      var a = '1';

      var result = checks.isArray(a);

      expect(result).to.be(false);
    });
  });

  describe('#isFunction', function() {
    it('return true when given a function', function() {
      var a = function b() { return 1; };

      var result = checks.isFunction(a);

      expect(result).to.be(true);
    });

    it('return false when not given a function', function() {
      var a = (function() { return 1; })();

      var result = checks.isFunction(a);

      expect(result).to.be(false);
    });
  });

  describe('#isRegExp', function() {
    it('return true when given a regexp', function() {
      var a = /[abc]/;

      var result = checks.isRegExp(a);

      expect(result).to.be(true);
    });

    it('return false when not given a regexp', function() {
      var a = '/[abc]/';

      var result = checks.isRegExp(a);

      expect(result).to.be(false);
    });
  });

  describe('#isBoolean', function() {
    it('return true when given a boolean', function() {
      var a = true;

      var result = checks.isBoolean(a);

      expect(result).to.be(true);
    });

    it('return false when not given a boolean', function() {
      var a = 0;

      var result = checks.isBoolean(a);

      expect(result).to.be(false);
    });
  });
});
