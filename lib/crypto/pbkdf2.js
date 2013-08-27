var crypto = require('crypto'),
    internals = {},
    externals = {},
    sha = require('./sha'),
    Q = require('q');

internals.ITERATIONS = 40000;
internals.KEY_LENGTH = 64;
internals.MIN_SALT_LENGTH = 64;


/**
 * Validation check for the given password
 *
 * @param  {String}   password
 * @param  {String}   salt        (Hex).
 * @param  {String}   hash        (Hex).
 * @param  {Number}   iterations
 * @param  {Function} callback    (Optional).
 *
 * @return {Promise}
 */
externals.authenticate = function(password, salt, hash, iterations) {

  return Q.fcall(function() {

    var deferred = Q.defer();

    if (!password) {
      throw new Error('Password required');
    }

    if (!salt) {
      throw new Error('Salt required');
    }

    if (!hash) {
      throw new Error('Existing hash required');
    }

    if (typeof hash !== 'string') {
      throw new Error('`hash` argument must be a string');
    }

    if (!iterations) {
      iterations = internals.ITERATIONS;
    }

    return externals.generate(password, salt, iterations).then(function(result) {
      return result.hash === hash;
    });
  });
};


/**
 * Wrapper around NodeJS crypto.pbkdf2
 *
 * Returns an object
 * {
 *   hash: {String},   (Hex)
 *   salt: {String}        (Hex)
 * }
 *
 * @param  {String}   password     Required.
 * @param  {String}   salt         Optional.
 * @param  {Number}   iterations   Optional.
 *
 * @return {Promise}
 */
externals.generate = function(password, salt, iterations) {

  return Q.fcall(function() {
    if (!password) {
      throw new Error('Password required');
    }

    if (typeof password !== 'string') {
      password = String(password);
    }

    if (!iterations) {
      iterations = internals.ITERATIONS;
    }

    if (!salt) {
      salt = sha._internals.generateSalt();
    } else if (typeof salt !== 'string' && typeof salt !== 'function') {
      throw new Error('Salt must be a string');
    } else if (typeof salt === 'function') {
      callback = salt;
      salt = sha._internals.generateSalt();
    } else if (salt.length < internals.MIN_SALT_LENGTH) {
      throw new Error('Salt is too short');
    }

    password = password + salt;

    return Q.nfapply(crypto.pbkdf2, [password, salt, iterations, internals.KEY_LENGTH])
    .then(function(result) { return { hash: Buffer(result, 'binary').toString('hex'), salt: salt }; });

  });
};


externals._internals = internals;

module.exports = externals;
