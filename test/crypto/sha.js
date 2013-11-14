var expect = require('expect.js'),
    stockpile = require('../'),
    sha = stockpile.crypto.sha;


describe('sha', function() {
  describe('#generate512', function() {
    var validsalt = '1d3eeac68c41fb3a5e3b05ffd7e936fdf2fde4f2e611a2ca7f472ab46c114e075c3f68420e6e3a55b141cb49c46385a54066aa3f4c7934bcf6bdeea298804efa';

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

    it('should return a valid hash', function(done) {
      sha.generate512('abc123', validsalt).done(function(result) {
        expect(result).to.be.a('object');
        expect(result).to.have.property('hash');
        expect(result.hash).to.be.a('string');
        expect(result).to.have.property('salt');
        expect(result.salt).to.be.a('string');
        expect(result.salt).to.be(validsalt);
        done();
      });
    });

  });

  describe('#authenticate512 - 10k iterations (Default)', function() {
    var validhash = 'd7d6484f47454977af7282d2cfad7cf6e66f8aa708a3bd0c64121e6ff3145affb1da5d88b77d826e2b001642de1f2a372c68770d255317b8016e8e7d047587d7';

    var invalidhash = 'd7d6484f47454977af7282d2cfad7cf6e66f8aa708a3bd0c64121e6ff3145affb1da5d88b77d826e2b001642de1f2a372c68770d255317b8016e8e7d047587d7a'; // added 'a'

    var validsalt = '1d3eeac68c41fb3a5e3b05ffd7e936fdf2fde4f2e611a2ca7f472ab46c114e075c3f68420e6e3a55b141cb49c46385a54066aa3f4c7934bcf6bdeea298804efa';

    var invalidsalt = '1d3eeac68c41fb3a5e3b05ffd7e936fdf2fde4f2e611a2ca7f472ab46c114e075c3f68420e6e3a55b141cb49c46385a54066aa3f4c7934bcf6bdeea298804efaa'; // added 'a'


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
