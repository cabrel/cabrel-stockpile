var expect = require('expect.js'),
    stockpile = require('../'),
    pbkdf2 = stockpile.crypto.pbkdf2;


describe('pbkdf2', function() {
  var validhash = '9595600d7c96a8988b5c1ef94a19dbb15d99500f434a40ee4bdc26246deae3eec8917cfcbe4dfb985ecb3fc8fc6de97e3d7445858f639602fc002af1b5668628';

  var invalidhash = '9595600d7c96a8988b5c1ef94a19dbb15d99500f434a40ee4bdc26246deae3eec8917cfcbe4dfb985ecb3fc8fc6de97e3d7445858f639602fc002af1b5668628a'; // added 'a' at the end

  var validsalt = 'a85515a12817f0821ca8755803ef3936b429a0e3d01586a08bccfab2932cba0fc76dbe4a7e3b8cab1501a5ddc4dc8006dbf71e27baa558dad2ca5925cabd54e8';

  var invalidsalt = 'a85515a12817f0821ca8755803ef3936b429a0e3d01586a08bccfab2932cba0fc76dbe4a7e3b8cab1501a5ddc4dc8006dbf71e27baa558dad2ca5925cabd54e8a'; // added 'a' at the end

  describe('#_internals', function() {
    describe('#generateSalt', function() {
      it('should return a 128 character string', function() {
        expect(pbkdf2._internals.generateSalt().length).to.be(128);
      });
    });
  });

  describe('#generate', function() {
    describe('#callback', function() {
      it('should throw an error if not given a password', function() {
        pbkdf2.generate(function(err, result) {
          expect(err).to.be.a(Error);
        });
      });

      it('should throw an error if salt is too short', function() {
        pbkdf2.generate('abc123', 'shortsalt', function(err, result) {
          expect(err).to.be.a(Error);
        });
      });

      it('should return a hash if given a password', function(done) {
        pbkdf2.generate('abc123', function(err, result) {
          expect(err).to.be(null);
          expect(result).to.be.a('object');
          expect(result).to.have.property('hash');
          expect(result).to.have.property('salt');

          done();
        });
      });

      it('should return a known hash with a pre-generated salt', function(done) {
        pbkdf2.generate('abc123', validsalt, function(err, result) {
          expect(err).to.be(null);
          expect(result.hash).to.be(validhash);
          done();
        });
      });

      it('should accept non-string passwords', function(done) {
        pbkdf2.generate(12345, function(err, result) {
          expect(err).to.be(null);
          expect(result.hash).to.be.ok();
          done();
        });
      });
    });

    describe('#promise', function() {
      it('should return a promise if no callback', function() {
        expect(pbkdf2.generate('abc123')).to.have.property('then');
      });

      it('should return an object', function(done) {
        pbkdf2.generate('abc123').done(function(result) {
          expect(result).to.be.a('object');
          expect(result).to.have.property('hash');
          expect(result).to.have.property('salt');

          done();
        });
      });
    });
  });

  describe('#authenticate', function() {
    describe('#callback', function() {
      it('should throw an error not given a password', function(done) {
        pbkdf2.authenticate(function(err, result) {
          expect(err).to.be.a(Error);
          done();
        });
      });

      it('should throw an error if not given a salt', function(done) {
        pbkdf2.authenticate('abc123', function(err, result) {
          expect(err).to.be.a(Error);
          done();
        });
      });

      it('should throw an error if salt is not a string', function(done) {
        pbkdf2.authenticate('abc123', 12345, validhash, function(err, result) {
          expect(err).to.be.a(Error);
          done();
        });
      });

      it('should throw an error if not given a hash', function(done) {
        pbkdf2.authenticate('abc123', 'salt', function(err, result) {
          expect(err).to.be.a(Error);
          done();
        });
      });

      it('should throw an error if a callback is given but no hash', function(done) {
        pbkdf2.authenticate('abc123', validsalt, function(err, result) {
          expect(err).to.be.a(Error);
          done();
        });
      });

      it('should throw an error if the hash is not a string', function(done) {
        pbkdf2.authenticate('abc123', validsalt, 1, function(err, result) {
          expect(err).to.be.a(Error);
          done();
        });
      });

      it('should throw an error from generate if the salt is too short', function(done) {
        pbkdf2.authenticate('abc123', 'shortsalt', function(err, result) {
          expect(err).to.be.a(Error);
          done();
        });
      });

    });

    describe('#promise', function() {
      it('should return true if password is correct', function(done) {
        pbkdf2.authenticate('abc123', validsalt, validhash).done(function(result) {
          expect(result).to.be(true);
          done();
        });
      });

      it('should return false if password is incorrect', function(done) {
        pbkdf2.authenticate('xyz123', validsalt, validhash).done(function(result) {
          expect(result).to.be(false);
          done();
        });
      });

      it('should return false if hash is incorrect but password is', function(done) {
        pbkdf2.authenticate('abc123', validsalt, invalidhash).done(function(result) {
          expect(result).to.be(false);
          done();
        });
      });

      it('should return false if the { hash, password } are correct but the salt is not', function(done) {
        pbkdf2.authenticate('abc123', invalidsalt, validhash).done(function(result) {
          expect(result).to.be(false);
          done();
        });
      });
    });

  });
});
