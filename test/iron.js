var expect = require('expect.js'),
    stockpile = require('../'),
    iron = stockpile.iron,
    util = require('util');


describe('iron', function() {
  describe('#seal', function() {


    it('should throw an error if no data given', function() {
      var fn = function() {
        iron.seal();
      };

      expect(fn).to.throwError();

    });


    it('should throw an error if no password given', function() {
      var fn = function() {
        iron.seal({ a: 1 });
      };

      expect(fn).to.throwError();

    });


    it('should throw an error if invalid options are given', function() {
      var fn = function() {
        iron.seal({ a: 1 }, 'test123', 'options');
      };

      expect(fn).to.throwError();

    });


    it('should return a promise if no callback given', function() {
      expect(iron.seal({ a: 1 }, 'test123')).to.have.property('then');

    });


    it('should return a promise and resolve a string', function(done) {
      iron.seal({ a: 1 }, 'test123').done(function(sealed) {
        expect(sealed).to.contain('Fe26.1');
        done();
      }, function(error) {
        expect(error).to.be(null);
      });

    });


    it('should return a nodejs callback if one is provided', function(done) {
      iron.seal({ a: 1 }, 'test123', function(err, result) {
        expect(err).to.be(null);
        expect(result).to.be.a('string');
        done();
      });
    });

  });

  describe('#unseal', function() {
    it('should throw an error if no data given', function() {
      var fn = function() {
        iron.unseal();
      };

      expect(fn).to.throwError();

    });

    it('should throw an error if no password given', function() {
      var fn = function() {
        iron.unseal('xyz');
      };

      expect(fn).to.throwError();

    });

    it('should throw an error if invalid options are given', function() {
      var fn = function() {
        iron.unseal('xyz', 'test123', 'options');
      };

      expect(fn).to.throwError();

    });

    it('should return a promise if no callback given', function() {
      expect(iron.unseal('xyz', 'test123')).to.have.property('then');

    });

    it('should return a promise and resolve a javascript object', function(done) {
      iron.seal({ a: 1 }, 'test123').then(function(sealed) {
        return iron.unseal(sealed, 'test123');
      }).then(function(unsealed) {
        expect(unsealed).to.be.a('object');
        expect(unsealed).to.have.key('a');
      }).done(done);

    });

    it('should return a nodejs callback if one is provided', function(done) {
      iron.seal({ a: 1 }, 'test123', function(err, sealed) {
        expect(err).to.be(null);
        expect(sealed).to.be.a('string');

        iron.unseal(sealed, 'test123', function(err, unsealed) {
          expect(err).to.be(null);
          expect(unsealed).to.be.a('object');
          done();
        });

      });
    });
  });
});
