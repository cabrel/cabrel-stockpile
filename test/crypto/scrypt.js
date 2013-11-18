var expect = require('expect.js'),
    stockpile = require('../'),
    scrypt = stockpile.crypto.scrypt,
    util = require('util');


describe('scrypt', function() {
  describe('#generate', function() {

    it('should throw an error if no password given', function(done) {
      scrypt.generate().done(null, function(error) {
        expect(error).to.be.an(Error);
        expect(error.message).to.contain('Password required');

        done();
      });
    });

    it('should return a string if given a password', function(done) {
      scrypt.generate('password123').done(function(result) {
        expect(result).to.be.a('string');
        done();
      });
    });

  });

  describe('#authenticate', function() {
    var validHash = 'c2NyeXB0ABEAAAAIAAAAAaGkTdCE1EBGvzIJCpvChUSaFVErcIjQduvVEp6PCEawreAtP9m69xUYmhTSTLF++DbiHXmdWYRik2VF2LxBnJ6nfmhGxNNp0YzPgaR39amA'; // password123 with maxtime = 3.0 (3 seconds)
    var invalidHash = 'abcc2NyeXB0ABEAAAAIAAAAAaGkTdCE1EBGvzIJCpvChUSaFVErcIjQduvVEp6PCEawreAtP9m69xUYmhTSTLF++DbiHXmdWYRik2VF2LxBnJ6nfmhGxNNp0YzPgaR39amA'; // added 'abc' to beginning of string

    it('should return true if given valid password and hash', function(done) {
      scrypt.authenticate('password123', validHash).done(function(result) {
        expect(result).to.be(true);
        done();
      });
    });

    it('should return false if given wrong password', function(done) {
      scrypt.authenticate('password124', validHash).done(function(result) {
        expect(result).to.be(false);
        done();
      });
    });

    it('should return false if given wrong hash', function(done) {
      scrypt.authenticate('password123', invalidHash).done(function(result) {
        expect(result).to.be(false);
        done();
      });
    });

    it('should throw an error if no password', function(done) {
      scrypt.authenticate().done(null, function(error) {
        expect(error).to.be.an(Error);
        expect(error.message).to.contain('Password required');
        done();
      });
    });

    it('should throw an error if no hash', function(done) {
      scrypt.authenticate('password123').done(null, function(error) {
        expect(error).to.be.an(Error);
        expect(error.message).to.contain('Hash required');
        done();
      });
    });
  });
});