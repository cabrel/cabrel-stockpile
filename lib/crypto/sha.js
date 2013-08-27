var crypto = require('crypto');
var externals = {};
var internals = {};
var Q = require('q');

internals.ITERATIONS = 10000;


/**
 * Authenticates a password against a given salt + hash
 *
 * @param  {String} password
 * @param  {String} salt
 * @param  {String} hash
 * @param  {Number} iterations
 *
 * @return {Promise}
 */
externals.authenticate512 = function(password, salt, hash, iterations) {

  return Q.fcall(function() {
    var deferred = Q.defer();

    if (!hash) {
      throw new Error('Hash required');
    }

    if (!iterations) {
      iterations = internals.ITERATIONS;
    }

    return externals.generate512(password, salt, iterations).then(function(result) {
      return result.hash === hash;
    });
  });
};


/**
 * Returns a SHA512 hash
 *
 * @param  {String} password
 * @param  {String} salt
 * @param  {Number} iterations
 *
 * @return {Promise}
 */
externals.generate512 = function(password, salt, iterations) {

  return Q.fcall(function() {
    var currentHash;

    if (!password) {
      throw new Error('Password required');
    }

    if (!iterations) {
      iterations = internals.ITERATIONS;
    }

    if (!salt) {
      salt = internals.generateSalt();
    }

    currentHash = salt + String(password + salt);

    for (var i = 0; i < iterations; i += 1) {
      currentHash = crypto.createHash('sha512').update(currentHash).digest('hex');
    }

    return { hash: currentHash, salt: salt };
  });
};


/**
 * [ description]
 *
 * @param  {[type]} iterations
 *
 * @return {[type]}
 */
internals.generateSalt = function() {
  return crypto.createHash('sha512').update(crypto.randomBytes(4096)).digest('hex');
};

externals._internals = internals;
module.exports = externals;
