var Hapi = require('hapi');
var internals = {};


/**
 * [passThrough description]
 *
 * @param  {[type]} error
 *
 * @return {[type]}
 */
internals.passThrough = function(error) {
  var payload = {
    message: null,
    stack: null
  };

  if (error) {
    if (typeof error.message !== 'undefined') {
      payload.message = error.message;
    }

    payload.stack = JSON.stringify(error.stack);
  }

  var passThrough = Hapi.error.passThrough(500, payload, 'application/json', {});

  return passThrough;
};

module.exports = internals;
