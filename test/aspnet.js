var expect = require('expect.js'),
    stockpile = require('../'),
    aspnet = stockpile.crypto.aspnet;


describe('aspnet', function() {
  describe('#generate', function() {
    it('should throw an error when no password is given', function(done) {
      aspnet.generate().done(null, function(error) {
        expect(error).to.be.a(Error);
        done();
      });
    });

    it('should throw an error when no salt is given', function(done) {
      aspnet.generate('abc123').done(null, function(error) {
        expect(error).to.be.a(Error);
        done();
      });
    });

    it('should return a hash', function(done) {
      aspnet.generate('abc123', 'xyz123').done(function(result) {
        expect(result).to.be.a('string');

        done();
      }, null);
    });
  });

  describe('#authenticate', function() {
    var hash = 'LSHRYo6VER15Q7NzIMzz9CGVpRE=';

    it('should return true if valid inputs', function(done) {
      aspnet.authenticate('abc123', 'xyz123', hash).done(function(result) {
        expect(result).to.be(true);
        done();
      });
    });

    it('should return false if invalid inputs', function(done) {
      aspnet.authenticate('abc123', 'abc123', hash).done(function(result) {
        expect(result).to.be(false);
        done();
      });
    });
  });
});
