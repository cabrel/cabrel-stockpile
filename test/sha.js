var expect = require('expect.js'),
    stockpile = require('../'),
    sha = stockpile.crypto.sha;


describe('sha', function() {
  describe('#generate512', function() {
    it('should return a promise', function() {
      expect(sha.generate512('abc', '123')).to.have.property('then');
    });

    it('should resolve to a string', function(done) {
      sha.generate512('abc', '123').done(function(result) {
        expect(result).to.be.a('string');
        done();
      });
    });

    it('should throw an error if no password given', function(done) {
      sha.generate512().done(null, function(error) {
        expect(error).to.be.an(Error);
        done();
      });
    });

    it('should still resolve to a string if not given a salt', function(done) {
      sha.generate512('abc123').done(function(result) {
        expect(result).to.be.a('string');
        done();
      });
    });
  });
});
