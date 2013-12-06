var expect = require('expect.js'),
    stockpile = require('../'),
    conversions = stockpile.conversions;


describe('conversions', function() {
  describe('periods', function() {
    describe('#midnight', function() {
      it('returns a valid moment object', function() {
        // Monday November 18, 2013 16:23:08 EST
        // Unix timestamp (seconds): 1384809788
        expect(conversions.periods.midnight).to.be.an(Object);
        expect(conversions.periods.midnight.hours()).to.be(0);
        expect(conversions.periods.midnight.minutes()).to.be(0);
        expect(conversions.periods.midnight.seconds()).to.be(0);
        expect(conversions.periods.midnight.milliseconds()).to.be(0);
      });
    });
  });
});
