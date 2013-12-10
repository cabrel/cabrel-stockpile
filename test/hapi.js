/* global define: false, $: false, _: false, describe: false, assert: false, it: false, beforeEach: false, before: false, after: false */

var expect = require('expect.js'),
    stockpile = require('../'),
    errors = stockpile.errors,
    util = require('util');


describe('Hapi', function() {
  describe('errors', function() {
    describe('#passThrough', function() {
      it('should return a Hapi.errors.passThrough object', function(done) {
        var passThrough = errors.passThrough(new Error('I am an error'));

        expect(passThrough).to.have.key('isBoom');
        expect(passThrough).to.have.key('response');
        expect(passThrough).to.have.key('message');
        expect(passThrough.message).to.be('Pass-through');

        done();
      });
    });

    describe('#internal', function() {
      it('should return a Hapi.errors.internal object', function(done) {
        var internal = errors.internal(new Error('I am an error'));

        expect(internal).to.have.key('isBoom');
        expect(internal).to.have.key('response');
        expect(internal).to.have.key('message');
        expect(internal).to.have.key('trace');
        expect(internal).to.have.key('outterTrace');

        done();
      });
    });
  });
});
