var _ = require('lodash');
var moment = require('moment');
var util = require('util');

exports.logTimeFormat = 'YYYY-MM-DD HH:mm:ss.SSSZZ';

exports.print = function() {
  var line = util.format.apply(this, _.values(arguments));
  exports._print(exports._logPrefix() + ' ' + line);
};

exports._logPrefix = function() {
  return util.format('[%s]', moment().format(exports.logTimeFormat));
};

exports._print = function() {
  console.log(util.format.apply(this, arguments));
};
