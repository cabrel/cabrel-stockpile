var crypto = require('crypto'),
    internals = {},
    externals = {},
    Q = require('q');

internals.ITERATIONS = 40000;
internals.KEY_LENGTH = 64;
internals.MIN_SALT_LENGTH = 64;


/**
 * Validation check for the given password
 *
 * @param  {String}   password
 * @param  {String}   salt      (Hex).
 * @param  {String}   hash      (Hex).
 * @param  {Function} callback  (Optional).
 *
 * @return {[type]}
 */
externals.authenticate = function(password, salt, hash, callback) {
  var deferred = Q.defer();

  if (typeof password === 'function') {
    callback = password;
    password = null;
  } else if (typeof salt === 'function') {
    callback = salt;
    salt = null;
  } else if (typeof hash === 'function') {
    callback = hash;
    hash = null;
  }

  if (!password || arguments.length === 0) {
    deferred.reject(new Error('Password required'));
  } else if (!salt || arguments.length === 1) {
    deferred.reject(new Error('Salt required'));
  } else if (!hash || arguments.length === 2) {
    deferred.reject(new Error('Existing hash required'));
  } else if (typeof hash !== 'string') {
    deferred.reject(new Error('`hash` argument must be a string'));
  } else {
    externals.generate(password, salt, function(err, result) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(result.hash === hash);
      }
    });
  }

  return deferred.promise.nodeify(callback);
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
 * @param  {String}   password  Required.
 * @param  {String}   salt      Optional.
 * @param  {Function} callback  Optional.
 *
 * @return {Object}
 */
externals.generate = function(password, salt, callback) {
  var deferred = Q.defer();

  if (typeof password === 'function') {
    callback = password;
    password = null;
  }

  if (!password) {
    deferred.reject(new Error('Password required'));
  } else if (typeof password !== 'string') {
    password = String(password);
  }

  if (!salt) {
    salt = internals.generateSalt();
  } else if (typeof salt !== 'string' && typeof salt !== 'function') {
    deferred.reject(new Error('Salt must be a string'));
  } else if (typeof salt === 'function') {
    callback = salt;
    salt = internals.generateSalt();
  } else if (salt.length < internals.MIN_SALT_LENGTH) {
    deferred.reject(new Error('Salt is too short'));
  }

  password = password + salt;

  Q.nfapply(crypto.pbkdf2, [password, salt, internals.ITERATIONS, internals.KEY_LENGTH]).done(function(result) {
    deferred.resolve({ hash: Buffer(result, 'binary').toString('hex'), salt: salt });

  }, deferred.reject);

  return deferred.promise.nodeify(callback);
};


/**
 * Generates a SHA512 hash generated from 3 iterations of
 * 2048 random bytes
 *
 * @return {String}
 */
internals.generateSalt = function() {
  var salt = crypto.createHash('sha512');

  for (var i = 0; i < 3; i++) {
    salt.update(crypto.randomBytes(2048));
  }

  return salt.digest('hex');
};


// for testability
externals._internals = internals;

module.exports = externals;
