var expect = require('expect.js'),
    stockpile = require('../'),
    sha = stockpile.crypto.sha;


describe('sha', function() {
  describe('#generate512', function() {
    it('should return a promise', function() {
      expect(sha.generate512('abc', '123')).to.have.property('then');
    });

    it('should resolve to a string', function(done) {
      sha.generate512('passwordabc', 'salt123').done(function(result) {
        expect(result).to.be.a('object');
        expect(result).to.have.property('hash');
        expect(result.hash).to.be.a('string');
        expect(result).to.have.property('salt');
        expect(result.salt).to.be.a('string');
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
        expect(result).to.be.a('object');
        expect(result).to.have.property('hash');
        expect(result.hash).to.be.a('string');
        expect(result).to.have.property('salt');
        expect(result.salt).to.be.a('string');

        done();
      });
    });
  });

  describe('#authenticate512', function() {
    var validhash = '56431446c4285cb77bd57dc57666fe5e7a4536ff124ce38ef7db2e135c949cc4834e66ed180b63241a6a0d3c77ac6f1b6aa1e3c04c3bcf6f28d1c763cd688f7a';

    var invalidhash = '56431446c4285cb77bd57dc57666fe5e7a4536ff124ce38ef7db2e135c949cc4834e66ed180b63241a6a0d3c77ac6f1b6aa1e3c04c3bcf6f28d1c763cd688f7aa'; // added extra 'a'

    var validsalt = 'c6b46022275ea77ee45c685a1013905024035cc21a374cf0aa61d47d8926609d017f369cc8de4415a687a572357531f9bd1b3e01e097bf33408abff44966cd0f';

    var invalidsalt = 'c6b46022275ea77ee45c685a1013905024035cc21a374cf0aa61d47d8926609d017f369cc8de4415a687a572357531f9bd1b3e01e097bf33408abff44966cd0fa'; // added 'a'

    it('should return a promise', function() {
      expect(sha.authenticate512('abc123', 'salt123', 'hash123')).to.have.property('then');
    });

    it('should relay error from generate512', function(done) {
      sha.authenticate512().done(null, function(error) {
        expect(error).to.be.an(Error);
        done();
      });
    });

    it('should return true when given the right password', function(done) {
      sha.authenticate512('abc123', validsalt, validhash).done(function(result) {
        expect(result).to.be(true);
        done();
      });
    });

    it('should return false when given the wrong password', function(done) {
      sha.authenticate512('abcd123', validsalt, validhash).done(function(result) {
        expect(result).to.be(false);
        done();
      });
    });

    it('should return false when given the wrong hash', function(done) {
      sha.authenticate512('abc123', validsalt, invalidhash).done(function(result) {
        expect(result).to.be(false);
        done();
      });
    });

    it('should return false when given the wrong salt', function(done) {
      sha.authenticate512('abc123', invalidsalt, validhash).done(function(result) {
        expect(result).to.be(false);
        done();
      });
    });

  });
});
