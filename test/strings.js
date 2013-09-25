var expect = require('expect.js'),
    stockpile = require('../'),
    strings = stockpile.strings,
    util = require('util');


describe('strings', function() {
  describe('#createSlug', function() {
    it('should return a string if given valid input', function() {
      var slug = strings.slug('this is a sentance.');

      expect(slug).to.contain('this-is-a-sentance');
    });

    it('should throw a error if not given input', function() {
      var fn = function() {
        strings.slug();
      };

      expect(fn).to.throwError();
    });
  });
});
