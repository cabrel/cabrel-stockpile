var scrypt = require('scrypt');
var Q = require('q');

var externals = {
};

//
// Tuning
//   maxtime: 0.1 // 100 milliseconds
//   maxtime: 1.0 // 1 second
//   maxtime: 2.0 // 2 seconds
//   maxtime: 3.0 // 3 seconds
//   maxtime: 4.0 // 4 seconds
var internals = {
  maxtime: 3.8 // 5 seconds
};


/**
 * Generates an scrypt hash for the given password
 *
 * @param  {String} password   Required
 * @param  {Number} maxtime    Optional
 *
 * @return {Promise}
 */
externals.generate = function(password, maxtime) {

  return Q.fcall(function() {
    var deferred = Q.defer();

    if (!password) {
      throw new Error('Password required');
    }

    if (!maxtime) {
      maxtime = internals.maxtime;
    }

    scrypt.passwordHash(password, maxtime, function(err, hash) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(hash);
      }
    });

    return deferred.promise;
  });
};


/**
 * Verifies the given password against the given hash
 *
 * @param  {String} password
 * @param  {String} hash
 *
 * @return {Promise}
 */
externals.authenticate = function(password, hash) {
  return Q.fcall(function() {
    var deferred = Q.defer();

    if (!password) {
      throw new Error('Password required');
    }

    if (!hash) {
      throw new Error('Hash required');
    }

    scrypt.verifyHash(hash, password, function(err, result) {
      if (err) {
        deferred.resolve(false);
      } else {
        deferred.resolve(true);
      }
    });

    return deferred.promise;
  });
};


module.exports = externals;
