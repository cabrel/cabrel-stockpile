var expect = require('expect.js'),
    stockpile = require('../'),
    hapi = stockpile.hapi,
    third = stockpile.third,
    util = require('util');


describe('Hapi', function() {
  describe('errors', function() {
    describe('#passThrough', function() {
      it('should return a Hapi.errors.passThrough object', function() {
        var passThrough = hapi.errors.passThrough(new Error());

        expect(passThrough).to.have.key('isBoom');
        expect(passThrough).to.have.key('response');
      });
    });
  });
});
