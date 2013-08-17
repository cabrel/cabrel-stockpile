var expect = require('expect.js'),
    stockpile = require('../'),
    log = stockpile.log,
    originalConsole = console.log;


describe('log', function() {
  describe('#print', function() {
    var _consoleOutput = [];

    beforeEach(function() {
      console.log = function() { _consoleOutput.push(_consoleOutput.slice.call(arguments)) };
    });

    afterEach(function() {
      _consoleOutput = [];
    });

    it('should print test', function() {
      stockpile.log.print('test');
      expect(_consoleOutput.length).to.be(1);
      expect(_consoleOutput[0][0]).to.contain('test');

      console.log = originalConsole;
    });
  });

  describe('#logTimeFormat', function() {
    it('should be YYYY-MM-DD HH:mm:ss.SSSZZ', function() {
      expect(stockpile.log.logTimeFormat).to.be('YYYY-MM-DD HH:mm:ss.SSSZZ');
    });
  });
});
