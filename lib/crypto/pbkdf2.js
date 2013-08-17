var crypto = require('crypto'),
    internals = {},
    externals = {},
    Q = require('q');


internals.ITERATIONS = 20000;
internals.KEY_LENGTH = 64;
internals.MIN_SALT_LENGTH = 64;
internals.MIN_WORKLOAD = 16;


/**
 * Returns an object
 * {
 *   password: {String},
 *   salt: {String}
 * }
 *
 * @param  {String} password  Required.
 * @param  {String} salt      Optional.
 *
 * @return {Object}
 */
externals.generate = function(password, salt) {
  if (!password) {
    throw new Error('Password required');
  }

  if (!salt) {

  }
};

module.exports = externals;
