var bcrypt = require('bcrypt');
var Q = require('q');

var externals = {
};

var internals = {
  workload: 14
};


/**
 * [generate description]
 *
 * @param  {String} password
 *
 * @return {Promise}
 */
externals.generate = function(password) {

  return Q.fcall(function() {
    var deferred = Q.defer();

    if (!password) {
      throw new Error('Password required');
    }

    bcrypt.hash(password, internals.workload, function(err, hash) {
      deferred.resolve(hash);
    });

    return deferred.promise;
  });
};


/**
 * [generate description]
 *
 * @param  {String} password
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

    bcrypt.compare(password, hash, function(err, result) {
      deferred.resolve(result);
    });

    return deferred.promise;
  });
};


module.exports = externals;
