var expect = require('expect.js'),
    stockpile = require('../'),
    pbkdf2 = stockpile.crypto.pbkdf2;


describe('pbkdf2', function() {
  var validhash = '9595600d7c96a8988b5c1ef94a19dbb15d99500f434a40ee4bdc26246deae3eec8917cfcbe4dfb985ecb3fc8fc6de97e3d7445858f639602fc002af1b5668628';

  var invalidhash = '9595600d7c96a8988b5c1ef94a19dbb15d99500f434a40ee4bdc26246deae3eec8917cfcbe4dfb985ecb3fc8fc6de97e3d7445858f639602fc002af1b5668628a'; // added 'a' at the end

  var validsalt = 'a85515a12817f0821ca8755803ef3936b429a0e3d01586a08bccfab2932cba0fc76dbe4a7e3b8cab1501a5ddc4dc8006dbf71e27baa558dad2ca5925cabd54e8';

  var invalidsalt = 'a85515a12817f0821ca8755803ef3936b429a0e3d01586a08bccfab2932cba0fc76dbe4a7e3b8cab1501a5ddc4dc8006dbf71e27baa558dad2ca5925cabd54e8a'; // added 'a' at the end

  describe('#generate', function() {
    it('should throw an error if not given a password', function(done) {
      pbkdf2.generate().done(null, function(error) {
        expect(error).to.be.a(Error);
        done();
      });
    });

    it('should throw an error if salt is too short', function(done) {
      pbkdf2.generate('abc123', 'shortsalt').done(null, function(error) {
        expect(error).to.be.a(Error);
        done();
      });
    });

    it('should return a hash if given a password', function(done) {
      pbkdf2.generate('abc123').done(function(result) {
        expect(result).to.be.a('object');
        expect(result).to.have.property('hash');
        expect(result).to.have.property('salt');

        done();
      });
    });

    it('should return a known hash with a pre-generated salt', function(done) {
      pbkdf2.generate('abc123', validsalt).done(function(result) {
        expect(result.hash).to.be(validhash);
        done();
      });
    });

    it('should accept non-string passwords', function(done) {
      pbkdf2.generate(12345).done(function(result) {
        expect(result.hash).to.be.ok();
        done();
      });
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

  describe('#authenticate', function() {
    it('should throw an error not given a password', function(done) {
      pbkdf2.authenticate().done(null, function(error) {
        expect(error).to.be.a(Error);
        done();
      });
    });

    it('should throw an error if not given a salt', function(done) {
      pbkdf2.authenticate('abc123').done(null, function(error) {
        expect(error).to.be.a(Error);
        done();
      });
    });

    it('should throw an error if salt is not a string', function(done) {
      pbkdf2.authenticate('abc123', 12345, validhash).done(null, function(error) {
        expect(error).to.be.a(Error);
        done();
      });
    });

    it('should throw an error if not given a hash', function(done) {
      pbkdf2.authenticate('abc123', 'salt').done(null, function(error) {
        expect(error).to.be.a(Error);
        done();
      });
    });

    it('should throw an error if a callback is given but no hash', function(done) {
      pbkdf2.authenticate('abc123', validsalt).done(null, function(error) {
        expect(error).to.be.a(Error);
        done();
      });
    });

    it('should throw an error if the hash is not a string', function(done) {
      pbkdf2.authenticate('abc123', validsalt, 1).done(null, function(error) {
        expect(error).to.be.a(Error);
        done();
      });
    });

    it('should throw an error from generate if the salt is too short', function(done) {
      pbkdf2.authenticate('abc123', 'shortsalt').done(null, function(error) {
        expect(error).to.be.a(Error);
        done();
      });
    });

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
