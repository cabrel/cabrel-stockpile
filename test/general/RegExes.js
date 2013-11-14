var expect = require('expect.js'),
        stockpile = require('../'),
        RegExes = stockpile.RegExes;

describe('RegExes', function() {
  describe('#EmailAddress', function() {
    it('should match a normal email address (you@example.com)', function() {
      expect(RegExes.EmailAddress.test('you@example.com')).to.be(true);
    });

    it('should match a normal email address (you@example.io)', function() {
      expect(RegExes.EmailAddress.test('you@example.io')).to.be(true);
    });

    it('should match a normal email address (you@example.co.uk)', function() {
      expect(RegExes.EmailAddress.test('you@example.co.uk')).to.be(true);
    });

    it('should match a normal email address (you+test@example.co.uk)', function() {
      expect(RegExes.EmailAddress.test('you+test@example.co.uk')).to.be(true);
    });

    it('should match a normal email address (you.me@example.co.uk)', function() {
      expect(RegExes.EmailAddress.test('you.me@example.co.uk')).to.be(true);
    });

    it('should not match an invalid email address (you@example)', function() {
      expect(RegExes.EmailAddress.test('you@example')).to.be(false);
    });

    it('should not match an invalid email address (you@)', function() {
      expect(RegExes.EmailAddress.test('you@')).to.be(false);
    });

    it('should not match an invalid email address (you@example.a)', function() {
      expect(RegExes.EmailAddress.test('you@example.a')).to.be(false);
    });
  });

  describe('#ObjectID', function() {
    it('should match a normal object id', function() {
      expect(RegExes.ObjectID.test('520d01d31c4a6af83d000004')).to.be(true);
    });

    it('should not match an invalid object id (25 characters)', function() {
      // 23 characters
      expect(RegExes.ObjectID.test('520d01d31c4a6af83d000004a')).to.be(false);
    });

    it('should not match an invalid object id (23 characters)', function() {
      // 23 characters
      expect(RegExes.ObjectID.test('520d01d31c4a6af83d00000')).to.be(false);
    });

    it('should not match an invalid object id (0)', function() {
      // 23 characters
      expect(RegExes.ObjectID.test('0')).to.be(false);
    });
  });
});
