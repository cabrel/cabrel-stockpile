var _ = require('lodash'),
    externals = {},
    internals = {},
    moment = require('moment'),
    util = require('util');

externals.logTimeFormat = 'YYYY-MM-DD HH:mm:ss.SSSZZ';

externals.print = function() {
  internals._print('%s %s', internals._logPrefix(), _.values(arguments));
};

internals._logPrefix = function() {
  return util.format('[%s]', moment().format(externals.logTimeFormat));
};

internals._print = function() {
  console.log(util.format.apply(this, arguments));
};

// for testing
externals._internals = internals;

module.exports = externals;


