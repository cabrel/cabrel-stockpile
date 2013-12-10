/**
 *  Wraps the request library in a promise
 *
 *  @return    {Promise}
 */
exports.requestq = function(options) {
  var Q = require('q');

  var Request = require('request');
  var deferred = Q.defer();

  Request(options, function(err, resp, body) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({ 'response': resp, 'body': body });
    }
  });

  return deferred.promise;
};
