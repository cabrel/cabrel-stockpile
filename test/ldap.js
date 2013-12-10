/* global define: false, $: false, _: false, describe: false, assert: false, it: false, beforeEach: false, before: false, after: false */

var expect = require('expect.js'),
    stockpile = require('../'),
    conversions = stockpile.conversions;


describe('conversions', function() {
  describe('ldap', function() {
    describe('#fromAdTimestamp', function() {
      it('returns a valid moment object', function() {
        // Monday November 18, 2013 16:23:08 EST
        // Unix timestamp (seconds): 1384809788
        var result = conversions.ldap.fromAdTimestamp(130292833877453899);

        // set the zone to be EST, only for testing
        result.zone('-05:00');

        expect(result).to.be.an(Object);
        expect(result._d).to.be.a(Date);
        expect(result.month()).to.be(10); // 0-index 0-11
        expect(result.year()).to.be(2013);
        expect(result.date()).to.be(18);
        expect(result.hour()).to.be(16);
        expect(result.minute()).to.be(23);
        expect(result.seconds()).to.be(08);
      });

      it('returns a valid moment object if given a string representation of a timestamp', function() {
        // Monday November 18, 2013 16:23:08 EST
        // Unix timestamp (seconds): 1384809788
        var result = conversions.ldap.fromAdTimestamp('130292833877453899');

        // set the zone to be EST, only for testing
        result.zone('-05:00');

        expect(result).to.be.an(Object);
        expect(result._d).to.be.a(Date);
        expect(result.month()).to.be(10); // 0-index 0-11
        expect(result.year()).to.be(2013);
        expect(result.date()).to.be(18);
        expect(result.hour()).to.be(16);
        expect(result.minute()).to.be(23);
        expect(result.seconds()).to.be(08);
      });

      it('throws an error if the input is too short', function() {
        var a = function() {
          conversions.ldap.fromAdTimestamp(13029283387745389);
        };

        expect(a).to.throwError();
      });

      it('throws an error if the input is a string and it is too short', function() {
        var a = function() {
          conversions.ldap.fromAdTimestamp('13029283387745389');
        };

        expect(a).to.throwError();
      });

      it('throws an error if the input is not a string or number', function() {
        var a = function() {
          conversions.ldap.fromAdTimestamp({ timestamp: '13029283387745389' });
        };

        expect(a).to.throwError();
      });

      it('throws an error if no input given', function() {
        var a = function() {
          conversions.ldap.fromAdTimestamp();
        };

        expect(a).to.throwError();
      });

    });
  });
});
