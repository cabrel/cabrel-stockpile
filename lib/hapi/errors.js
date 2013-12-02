var Hapi = require('hapi');


/**
 * [passThrough description]
 *
 * @param  {[type]} error
 *
 * @return {[type]}
 */
exports.passThrough = function passThrough(error) {
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

  return Hapi.error.passThrough(500, payload, 'application/json', {});
};
