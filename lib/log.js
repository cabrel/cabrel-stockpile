var externals = {},
    internals = {},
    moment = require('moment'),
    util = require('util');

externals.print = function() {
  internals._print('[%s] %s', moment().format('YYYY-MM-DD HH:mm:ssZZ'), arguments);

}

internals._print = function() {
  console.log(util.format.apply(this, arguments) + '\n');
}

module.exports = externals;


