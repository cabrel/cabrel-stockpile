var expect = require('expect.js'),
    stockpile = require('../'),
    bcrypt = stockpile.crypto.bcrypt,
    util = require('util');


describe('bcrypt', function() {
  describe('#generate', function() {

    it('should throw an error if no password given', function(done) {
      bcrypt.generate().done(null, function(error) {
        expect(error).to.be.an(Error);
        expect(error.message).to.contain('Password required');

        done();
      });
    });

    it('should return a string if given a password', function(done) {
      bcrypt.generate('password123').done(function(result) {
        expect(result).to.be.a('string');
        done();
      });
    });

  });

  describe('#authenticate', function() {
    var validHash = '$2a$14$syIJsSIiBlP2qQu1SD/je.tPgcS0ajmtoGYw2RNZ.iP8emSbNYXaC'; //password123
    var invalidHash = '$2a$10$syIJsSIiBlP2qQu1SD/je.tPgcS0ajmtoGYw2RNZ.iP8emSbNYXaC'; //password123, workload of 10

    it('should return true if given valid password and hash', function(done) {
      bcrypt.authenticate('password123', validHash).done(function(result) {
        expect(result).to.be(true);
        done();
      });
    });

    it('should return false if given wrong password', function(done) {
      bcrypt.authenticate('password124', validHash).done(function(result) {
        expect(result).to.be(false);
        done();
      });
    });

    it('should return false if given wrong hash', function(done) {
      bcrypt.authenticate('password123', invalidHash).done(function(result) {
        expect(result).to.be(false);
        done();
      });
    });

    it('should throw an error if no password', function(done) {
      bcrypt.authenticate().done(null, function(error) {
        expect(error).to.be.an(Error);
        expect(error.message).to.contain('Password required');
        done();
      });
    });

    it('should throw an error if no hash', function(done) {
      bcrypt.authenticate('password123').done(null, function(error) {
        expect(error).to.be.an(Error);
        expect(error.message).to.contain('Hash required');
        done();
      });
    });
  });
});
