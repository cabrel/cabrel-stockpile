var crypto = require('crypto'),
    externals = {},
    internals = {},
    Q = require('q');

internals.ITERATIONS = 3;


/**
 * [ description]
 *
 * @param  {[type]} password
 * @param  {[type]} salt
 * @param  {[type]} hash
 *
 * @return {[type]}
 */
externals.authenticate512 = function(password, salt, hash) {
  var deferred = Q.defer();

  if (!hash) {
    deferred.reject(new Error('Hash required'));
  }

  if (deferred.promise.inspect().state === 'pending') {
    externals.generate512(password, salt).done(function(result) {
      deferred.resolve(result.hash === hash);
    }, deferred.reject);
  }

  return deferred.promise;
};


/**
 * [ description]
 *
 * @param  {[type]} password
 * @param  {[type]} salt
 *
 * @return {[type]}
 */
externals.generate512 = function(password, salt) {
  var currentHash,
      deferred = Q.defer();

  if (!password) {
    deferred.reject(new Error('Password required'));
  }

  if (!salt) {
    salt = internals.generateSalt();
  }

  currentHash = salt + (password + salt);

  if (deferred.promise.inspect().state === 'pending') {
    for (var i = 0; i < internals.ITERATIONS; i++) {
      currentHash = crypto.createHash('sha512').update(currentHash).digest('hex');
    }

    deferred.resolve({ hash: currentHash, salt: salt });
  }

  return deferred.promise;
};


/**
 * [ description]
 *
 * @param  {[type]} iterations
 *
 * @return {[type]}
 */
internals.generateSalt = function() {
  var salt = crypto.createHash('sha512');

  for (var i = 0; i < internals.ITERATIONS; i++) {
    salt.update(crypto.randomBytes(2048));
  }

  return salt.digest('hex');
};

externals._internals = internals;
module.exports = externals;
