var should = require('should'),
    stockpile = require('../'),
    log = stockpile.log,
    _originalConsole = console.log;


describe('log', function() {
  describe('#print', function() {
    var _consoleOutput = [];

    beforeEach(function(done) {
      console.log = function() { _consoleOutput.push(_consoleOutput.slice.call(arguments)) };

      done();
    });

    afterEach(function(done) {
      _consoleOutput = [];
      done();
    });

    it('should print test', function(done) {
      stockpile.log.print('test');
      _consoleOutput.length.should.equal(1);
      _consoleOutput[0][0].should.include('test');

      console.log = _originalConsole;

      done();
    });
  });

  describe('#logTimeFormat', function() {
    it('should be YYYY-MM-DD HH:mm:ss.SSSZZ', function(done) {
      stockpile.log.logTimeFormat.should.equal('YYYY-MM-DD HH:mm:ss.SSSZZ');

      done();
    });
  });
});
