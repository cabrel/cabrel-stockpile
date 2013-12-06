var Hapi = require('hapi');
var checks = require('../general/checks');
var NodeUtil = require('util');


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

  if (checks.isDefined(error)) {
    if (checks.isDefined(error.message) && error.message != null) {
      payload.message = error.message;
    }

    payload.stack = error.stack;
  }

  return Hapi.error.passThrough(500, payload, 'text/plain', {});
};


/**
 * [internal description]
 *
 * @param  {[type]} error
 *
 * @return {[type]}
 */
exports.internal = function internal(error) {
  if (checks.isDefined(error)) {
    if (checks.isDefined(error.message) && error.message != null) {
      return Hapi.error.internal(error.message, error);
    }
  } else {
    return Hapi.error.internal('ERROR', new Error());
  }
};
