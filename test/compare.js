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
});
