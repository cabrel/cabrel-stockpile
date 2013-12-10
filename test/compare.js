/* global define: false, $: false, _: false, describe: false, assert: false, it: false, beforeEach: false, before: false, after: false */

'use strict';

var expect = require('chai').expect;
var compare = require('../').compare;

describe('compare', function() {
  describe('#EmailAddress', function() {
    it('should match a normal email address (you@example.com)', function() {
      expect(compare.EmailAddress.test('you@example.com')).to.equal(true);
    });

    it('should match a normal email address (you@example.io)', function() {
      expect(compare.EmailAddress.test('you@example.io')).to.equal(true);
    });

    it('should match a normal email address (you@example.co.uk)', function() {
      expect(compare.EmailAddress.test('you@example.co.uk')).to.equal(true);
    });

    it('should match a normal email address (you+test@example.co.uk)', function() {
      expect(compare.EmailAddress.test('you+test@example.co.uk')).to.equal(true);
    });

    it('should match a normal email address (you.me@example.co.uk)', function() {
      expect(compare.EmailAddress.test('you.me@example.co.uk')).to.equal(true);
    });

    it('should not match an invalid email address (you@example)', function() {
      expect(compare.EmailAddress.test('you@example')).to.equal(false);
    });

    it('should not match an invalid email address (you@)', function() {
      expect(compare.EmailAddress.test('you@')).to.equal(false);
    });

    it('should not match an invalid email address (you@example.a)', function() {
      expect(compare.EmailAddress.test('you@example.a')).to.equal(false);
    });
  });

  describe('#ObjectID', function() {
    it('should match a normal object id', function() {
      expect(compare.ObjectID.test('520d01d31c4a6af83d000004')).to.equal(true);
    });

    it('should not match an invalid object id (25 characters)', function() {
      // 23 characters
      expect(compare.ObjectID.test('520d01d31c4a6af83d000004a')).to.equal(false);
    });

    it('should not match an invalid object id (23 characters)', function() {
      // 23 characters
      expect(compare.ObjectID.test('520d01d31c4a6af83d00000')).to.equal(false);
    });

    it('should not match an invalid object id (0)', function() {
      // 23 characters
      expect(compare.ObjectID.test('0')).to.equal(false);
    });
  });

  describe('#matchObjectId()', function() {
    it('should find a match in an array', function() {
      var source = [
        '0', '1', '2', '3', '4'
      ];
      var toFind = '3';
      expect(compare.matchObjectId(source, toFind)).to.equal(true);
    });

    it('should find return true if given a matching string source', function() {
      var source = '3';
      var toFind = '3';
      expect(compare.matchObjectId(source, toFind)).to.equal(true);
    });

    it('should find return true if given an object with an _id property', function() {
      var source = { _id: '3' };
      var toFind = '3';
      expect(compare.matchObjectId(source, toFind)).to.equal(true);
    });

    it('should find return true if given an object with an id property', function() {
      var source = { id: '3' };
      var toFind = '3';
      expect(compare.matchObjectId(source, toFind)).to.equal(true);
    });

    it('should return true if given an array of objects with an _id property', function() {
      var source = [{ _id: '3' }];
      var toFind = '3';
      expect(compare.matchObjectId(source, toFind)).to.equal(true);
    });

    it('should return true if given an array of objects with an id property', function() {
      var source = [{ id: '3' }];
      var toFind = '3';
      expect(compare.matchObjectId(source, toFind)).to.equal(true);
    });

    it('should not find a match in an array', function() {
      var source = [
        '0', '1', '2', '3', '4'
      ];
      var toFind = '5';
      expect(compare.matchObjectId(source, toFind)).to.equal(false);
    });

    it('should not find a match in a string if different', function() {
      var source = '3';
      var toFind = '5';
      expect(compare.matchObjectId(source, toFind)).to.equal(false);
    });

    it('should not return false if given an empty source array', function() {
      var source = [];
      var toFind = '5';
      expect(compare.matchObjectId(source, toFind)).to.equal(false);
    });

    it('should throw an error if the haystack is undefined', function() {
      var source = undefined;
      var toFind = '5';
      var fn = function() {
        compare.matchObjectId(source, toFind);
      };
      expect(fn).to.throw(/Haystack undefined/i);
    });

    it('should throw an error if the needle is undefined', function() {
      var source = [];
      var toFind = undefined;
      var fn = function() {
        compare.matchObjectId(source, toFind);
      };
      expect(fn).to.throw(/Needle undefined/i);
    });

    it('should return false if it cant parse the haystack or needle', function() {
      var source = 1;
      var toFind = 1;
      expect(compare.matchObjectId(source, toFind)).to.equal(false);
    });
  });
});
