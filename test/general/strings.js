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

  describe('#parseNTUsername', function() {
    it('should return an object containing domain and username (Netbios username)', function() {
      var username = 'DOMAIN\\username';
      var result = strings.parseNTUsername(username);

      expect(result).to.have.property('domain');
      expect(result.domain).to.be('DOMAIN');

      expect(result).to.have.property('username');
      expect(result.username).to.be('username');
    });

    it('should return an object containing domain and username (User Principal Name)', function() {
      var username = 'username@domain.local';
      var result = strings.parseNTUsername(username);

      expect(result).to.have.property('domain');
      expect(result.domain).to.be('domain');

      expect(result).to.have.property('username');
      expect(result.username).to.be('username');
    });

    it('should return null if given an unknown format', function() {
      var username = 'username|domain.local';
      var result = strings.parseNTUsername(username);

      expect(result).to.be(null);
    });
  });
});
