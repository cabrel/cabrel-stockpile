/* global define: false, $: false, _: false, describe: false, assert: false, it: false, beforeEach: false, before: false, after: false */

'use strict';
var expect = require('chai').expect;
var validate = require('../').validate;
var ObjectID = require('mongodb').ObjectID;

describe('validate.js', function() {
  describe('#validateObjectId', function() {
    it('should throw an error if no input', function(done) {
      var fn = function() {
        validate.validateObjectId();
      };

      expect(fn).to.throw(/Input is missing/);
      done();
    });

    it('should return the same id if given a valid one', function(done) {
      var id = '000000000000000000000000';
      expect(validate.validateObjectId(id, 'test')).to.equal(id);
      done();
    });

    it('should return the string id if given an ObjectId', function(done) {
      var id = new ObjectID();

      expect(validate.validateObjectId(id, 'test')).to.equal(id.toString());

      done();
    });

    it('should return the string id if given a object with an `id` property', function(done) {
      var obj = {
        some: false,
        id: new ObjectID()
      };

      expect(validate.validateObjectId(obj, 'test')).to.equal(obj.id.toString());

      done();
    });

    it('should throw an error if a non string/object given', function(done) {
      var fn = function() {
        validate.validateObjectId(1234, 'test');
      };

      expect(fn).to.throw(/expected test to be a string or object/i);

      done();
    });
  });
});
